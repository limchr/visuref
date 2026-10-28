# Backend / frontend split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split VisArt into a static frontend and a two-file FastAPI backend, with host PostgreSQL on the server, Docker PostgreSQL for debugging, and a Cursor session that starts the debug stack and attaches to debugpy.

**Architecture:** `docker-compose.yml` runs only the backend, published on `127.0.0.1:8000`, and reads `DATABASE_URL` for PostgreSQL on the host. `docker-compose.debug.yml` adds Postgres, an nginx frontend, a source mount, and a debugpy command. The existing server nginx serves `frontend/` and proxies `/api/` to the backend. Cursor's `VisArt` launch config brings the debug stack up, attaches, and tears it down.

**Tech Stack:** Python 3.13, uv, FastAPI, SQLModel, psycopg, debugpy, nginx:alpine, Postgres 16, Docker Compose, Cursor debugpy attach.

## Global Constraints

- Python requirement is `>=3.13` and the backend image is `python:3.13-slim`.
- Direct dependencies are `fastapi`, `uvicorn`, `sqlmodel`, `psycopg[binary]`, and `debugpy`.
- Server `DATABASE_URL` default is `postgresql+psycopg://visart:visart@host.docker.internal:5432/visart`.
- Debug `DATABASE_URL` is `postgresql+psycopg://visart:visart@db:5432/visart`.
- Debug Postgres is image `postgres:16`, user `visart`, password `visart`, database `visart`, host port `5432`, with no data volume.
- Server backend port binding is `127.0.0.1:8000:8000`, with `extra_hosts: ["host.docker.internal:host-gateway"]`.
- Debug publishes `5678:5678` and does not bind host port `8000` a second time.
- Debug frontend publishes `8080:80` and `depends_on` the backend.
- Debug command is `python -m debugpy --listen 0.0.0.0:5678 --wait-for-client -m uvicorn main:app --host 0.0.0.0 --port 8000`.
- `db.py` creates one SQLModel engine from `DATABASE_URL`. `main.py` exposes `GET /health`, which runs `SELECT 1` and returns `{"ok": true}`.
- No tables, no `create_all`, no session helper, and no Pydantic import.
- No test files and no test runner.
- No course models, lecture content, comments, accounts, or gallery metadata.
- `README.md`, `notes.md`, `image_process.py`, and `CNAME` stay at the repo root.
- The live server nginx configuration is not edited. The server block is written into `AGENTS.md`.
- Backend virtualenv path is `/opt/venv`, and the working directory is `/app`.
- Code stays plain and human-readable: no dead code, no function whose body only calls another function, and no file that only re-exports or wraps one call.

## File structure

- `backend/pyproject.toml` — uv project metadata and dependencies. Not an installable package.
- `backend/uv.lock` — lockfile produced by `uv lock`.
- `backend/db.py` — SQLModel engine.
- `backend/main.py` — FastAPI app and `/health`.
- `backend/Dockerfile` — runtime image. Uvicorn is the image command.
- `frontend/nginx.conf` — debug container site and `/api/` proxy.
- `frontend/Dockerfile` — nginx image for the debug stack.
- `frontend/` static files — the current site, moved unchanged.
- `docker-compose.yml` — server stack: backend only.
- `docker-compose.debug.yml` — debug additions: Postgres, frontend, debugpy.
- `.vscode/launch.json` — Cursor attach configuration `VisArt`.
- `.vscode/tasks.json` — `debug-up` and `debug-down`.
- `AGENTS.md` — layout, run modes, database URLs, server nginx block, and code rules.

---

### Task 1: Backend application

**Files:**
- Create: `backend/pyproject.toml`
- Create: `backend/db.py`
- Create: `backend/main.py`
- Create: `backend/uv.lock`

**Interfaces:**
- Consumes: nothing
- Produces: module `db` with global `engine` from `sqlmodel.create_engine`. Module `main` with global `app` (`fastapi.FastAPI`) and route `GET /health` returning `{"ok": true}` after `SELECT 1`. Importing `db` reads `os.environ["DATABASE_URL"]`.

- [ ] **Step 1: Confirm uv is installed**

Run: `command -v uv`

Expected: a filesystem path. If the command fails, install uv and rerun:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

- [ ] **Step 2: Write the uv project**

Create `backend/pyproject.toml`:

```toml
[project]
name = "visart-backend"
version = "0.1.0"
requires-python = ">=3.13"
dependencies = [
    "fastapi",
    "uvicorn",
    "sqlmodel",
    "psycopg[binary]",
    "debugpy",
]

[tool.uv]
package = false
```

- [ ] **Step 3: Write the database module**

Create `backend/db.py`:

```python
import os

from sqlmodel import create_engine

engine = create_engine(os.environ["DATABASE_URL"])
```

- [ ] **Step 4: Write the API module**

Create `backend/main.py`:

```python
from fastapi import FastAPI
from sqlmodel import text

from db import engine

app = FastAPI()


@app.get("/health")
def health():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1")).one()
    return {"ok": True}
```

- [ ] **Step 5: Lock dependencies**

Run:

```bash
uv lock --directory backend
```

Expected: exit 0 and a new `backend/uv.lock`.

- [ ] **Step 6: Verify the app imports**

Run:

```bash
cd backend && DATABASE_URL=postgresql+psycopg://visart:visart@localhost:5432/visart uv run python -c 'from main import app; assert any(getattr(route, "path", None) == "/health" for route in app.routes); print("health-ok")'
```

Expected: `health-ok`

- [ ] **Step 7: Commit**

```bash
git add backend/pyproject.toml backend/uv.lock backend/db.py backend/main.py
git commit -m "$(cat <<'EOF'
add the backend app

EOF
)"
```

---

### Task 2: Backend image

**Files:**
- Create: `backend/Dockerfile`

**Interfaces:**
- Consumes: `backend/pyproject.toml`, `backend/uv.lock`, `backend/main.py` (`app`), `backend/db.py` (`engine`)
- Produces: image command `uvicorn main:app --host 0.0.0.0 --port 8000`, virtualenv at `/opt/venv`

- [ ] **Step 1: Write the Dockerfile**

Create `backend/Dockerfile`:

```dockerfile
FROM python:3.13-slim

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

ENV UV_PROJECT_ENVIRONMENT=/opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev --no-install-project

COPY main.py db.py ./

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

- [ ] **Step 2: Build the image**

Run:

```bash
docker build -t visart-backend ./backend
```

Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add backend/Dockerfile
git commit -m "$(cat <<'EOF'
add the backend image

EOF
)"
```

---

### Task 3: Frontend image

**Files:**
- Move: `index.html`, `style.css`, `robots.txt`, `favicon.ico`, `cookie_policy.html`, `impressum.html`, `privacy_policy.html`, `small_banner_1.png`, `small_banner_2.png`, `small_banner_3.png`, `small_banner_4.png`, `css/`, `js/`, `data/` → `frontend/`
- Create: `frontend/nginx.conf`
- Create: `frontend/Dockerfile`

**Interfaces:**
- Consumes: the current static site
- Produces: nginx on port 80, site root `/usr/share/nginx/html`, `location /api/` proxied to `http://backend:8000/` with the prefix stripped

- [ ] **Step 1: Move the site**

Run from the repo root:

```bash
mkdir -p frontend
git mv index.html style.css robots.txt favicon.ico cookie_policy.html impressum.html privacy_policy.html frontend/
git mv small_banner_1.png small_banner_2.png small_banner_3.png small_banner_4.png frontend/
git mv css js data frontend/
```

Leave `README.md`, `notes.md`, `image_process.py`, `CNAME`, and `.DS_Store` at the repo root.

- [ ] **Step 2: Write the nginx config**

Create `frontend/nginx.conf`:

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;

    location /api/ {
        proxy_pass http://backend:8000/;
    }

    location / {
        try_files $uri $uri/ =404;
    }
}
```

- [ ] **Step 3: Write the frontend Dockerfile**

Create `frontend/Dockerfile`:

```dockerfile
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY *.html style.css robots.txt favicon.ico *.png /usr/share/nginx/html/
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
COPY data /usr/share/nginx/html/data
```

- [ ] **Step 4: Build and serve the site**

Run:

```bash
docker build -t visart-frontend ./frontend
docker rm -f visart-frontend-check >/dev/null 2>&1 || true
docker run -d --name visart-frontend-check -p 8080:80 visart-frontend
curl -fsS http://127.0.0.1:8080/ | grep -q "VisArt.app"
code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8080/api/health)
docker rm -f visart-frontend-check
test "$code" = "502"
echo "frontend-ok"
```

Expected: `frontend-ok`. The page contains `VisArt.app`. `/api/health` returns 502 because this container is started without a backend.

- [ ] **Step 5: Commit**

```bash
git add frontend
git commit -m "$(cat <<'EOF'
move the site into the frontend image

EOF
)"
```

---

### Task 4: Compose stacks

**Files:**
- Create: `docker-compose.yml`
- Create: `docker-compose.debug.yml`

**Interfaces:**
- Consumes: `backend/Dockerfile` image command, `frontend/Dockerfile`, `db.engine`, `main.app`
- Produces: server project service `backend`; debug project services `backend`, `db`, and `frontend`. Debug backend command waits on debugpy. Verification may override that command on the CLI. Do not change the file to plain Uvicorn.

- [ ] **Step 1: Write the server stack**

Create `docker-compose.yml`:

```yaml
services:
  backend:
    build: ./backend
    ports:
      - "127.0.0.1:8000:8000"
    extra_hosts:
      - "host.docker.internal:host-gateway"
    environment:
      DATABASE_URL: ${DATABASE_URL:-postgresql+psycopg://visart:visart@host.docker.internal:5432/visart}
```

- [ ] **Step 2: Write the debug stack**

Create `docker-compose.debug.yml`:

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: visart
      POSTGRES_PASSWORD: visart
      POSTGRES_DB: visart
    ports:
      - "5432:5432"

  frontend:
    build: ./frontend
    ports:
      - "8080:80"
    depends_on:
      - backend

  backend:
    environment:
      DATABASE_URL: postgresql+psycopg://visart:visart@db:5432/visart
    ports:
      - "5678:5678"
    volumes:
      - ./backend:/app
    command:
      - python
      - -m
      - debugpy
      - --listen
      - 0.0.0.0:5678
      - --wait-for-client
      - -m
      - uvicorn
      - main:app
      - --host
      - 0.0.0.0
      - --port
      - "8000"
    depends_on:
      - db
```

- [ ] **Step 3: Check the merged service lists**

Run:

```bash
docker compose -f docker-compose.yml config --services | sort
docker compose -f docker-compose.yml -f docker-compose.debug.yml config --services | sort
```

Expected first command:

```text
backend
```

Expected second command:

```text
backend
db
frontend
```

- [ ] **Step 4: Verify health through FastAPI and through nginx**

The debug file's command waits for a debugger, so this check overrides the command for one container. Leave `docker-compose.debug.yml` unchanged.

Run:

```bash
bash <<'EOF'
set -euo pipefail
cleanup() {
  docker compose -f docker-compose.yml -f docker-compose.debug.yml down --remove-orphans
  docker rm -f visart-api-check >/dev/null 2>&1 || true
}
trap cleanup EXIT
docker compose -f docker-compose.yml -f docker-compose.debug.yml down --remove-orphans
docker rm -f visart-api-check >/dev/null 2>&1 || true
docker compose -f docker-compose.yml -f docker-compose.debug.yml up --build -d db
ready=0
for i in $(seq 1 50); do
  if docker compose -f docker-compose.yml -f docker-compose.debug.yml exec -T db pg_isready -U visart; then
    ready=1
    break
  fi
  sleep 0.2
done
test "$ready" = "1"
docker compose -f docker-compose.yml -f docker-compose.debug.yml run -d --name visart-api-check --use-aliases --service-ports \
  backend uvicorn main:app --host 0.0.0.0 --port 8000
healthy=0
for i in $(seq 1 50); do
  if curl -fsS http://127.0.0.1:8000/health | grep -q '{"ok":true}'; then
    healthy=1
    break
  fi
  sleep 0.2
done
test "$healthy" = "1"
docker compose -f docker-compose.yml -f docker-compose.debug.yml up --build -d --no-deps frontend
curl -fsS http://127.0.0.1:8080/ | grep -q "VisArt.app"
curl -fsS http://127.0.0.1:8080/api/health | grep -q '{"ok":true}'
echo "compose-ok"
EOF
```

Expected: `compose-ok`

- [ ] **Step 5: Commit**

```bash
git add docker-compose.yml docker-compose.debug.yml
git commit -m "$(cat <<'EOF'
add server and debug compose stacks

EOF
)"
```

---

### Task 5: Cursor debug session

**Files:**
- Create: `.vscode/launch.json`
- Create: `.vscode/tasks.json`

**Interfaces:**
- Consumes: debug Compose services and debugpy on `localhost:5678`. Remote root `/app` is the mounted `backend/` directory.
- Produces: launch configuration name `VisArt`, preLaunch task `debug-up`, postDebug task `debug-down`

- [ ] **Step 1: Write the launch configuration**

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "VisArt",
      "type": "debugpy",
      "request": "attach",
      "connect": {
        "host": "localhost",
        "port": 5678
      },
      "pathMappings": [
        {
          "localRoot": "${workspaceFolder}/backend",
          "remoteRoot": "/app"
        }
      ],
      "preLaunchTask": "debug-up",
      "postDebugTask": "debug-down"
    }
  ]
}
```

- [ ] **Step 2: Write the tasks**

Create `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "debug-up",
      "type": "shell",
      "command": "docker compose -f docker-compose.yml -f docker-compose.debug.yml up --build -d && for i in $(seq 1 50); do if (echo >/dev/tcp/localhost/5678) >/dev/null 2>&1; then exit 0; fi; sleep 0.2; done; echo \"debugpy did not open port 5678\" >&2; exit 1",
      "problemMatcher": []
    },
    {
      "label": "debug-down",
      "type": "shell",
      "command": "docker compose -f docker-compose.yml -f docker-compose.debug.yml down",
      "problemMatcher": []
    }
  ]
}
```

- [ ] **Step 3: Verify the JSON and the debugpy port**

Run:

```bash
python3 -m json.tool .vscode/launch.json >/dev/null
python3 -m json.tool .vscode/tasks.json >/dev/null
status=0
bash -lc 'docker compose -f docker-compose.yml -f docker-compose.debug.yml up --build -d && for i in $(seq 1 50); do if (echo >/dev/tcp/localhost/5678) >/dev/null 2>&1; then exit 0; fi; sleep 0.2; done; echo "debugpy did not open port 5678" >&2; exit 1' || status=$?
docker compose -f docker-compose.yml -f docker-compose.debug.yml down --remove-orphans
test "$status" = "0"
echo "debug-session-ok"
```

Expected: `debug-session-ok`. Port 5678 accepts a connection. The shell then stops the stack.

- [ ] **Step 4: Commit**

```bash
git add .vscode/launch.json .vscode/tasks.json
git commit -m "$(cat <<'EOF'
add the cursor debug session

EOF
)"
```

---

### Task 6: AGENTS.md

**Files:**
- Create: `AGENTS.md`

**Interfaces:**
- Consumes: the layout and commands from Tasks 1–5
- Produces: repo-root instructions for later work in this repository

- [ ] **Step 1: Write AGENTS.md**

Create `AGENTS.md`:

```markdown
# VisArt

VisArt is a static art-study site plus a small API. The site asks how to see what is actually there, and the image pipeline runs in the browser.

## Layout

- `frontend/` is the static site. Debug runs it in nginx. The server uses the host nginx already installed on the machine.
- `backend/main.py` is the FastAPI app. `backend/db.py` creates the SQLModel engine. Those are the only Python modules.
- `docker-compose.yml` is the server stack.
- `docker-compose.debug.yml` is the local debug difference.
- `.vscode/launch.json` configuration `VisArt` starts the debug stack and attaches.
- `image_process.py` is a local image-optimization script. It is not in either image.
- `README.md`, `notes.md`, and `CNAME` stay at the repo root.

The database has no tables. Do not add tables, `create_all`, course or lecture models, seed data, comments, accounts, or gallery metadata until that is discussed.

The course page is the static markup moved with the site. Its nav link stays commented out. Do not connect it to the API in this structure.

## Run the server stack

```bash
docker compose up --build
```

This starts only the backend, bound to `127.0.0.1:8000`. `DATABASE_URL` defaults to:

`postgresql+psycopg://visart:visart@host.docker.internal:5432/visart`

Set `DATABASE_URL` when the host database name or credentials differ. The Compose service maps `host.docker.internal` to the host gateway.

`GET http://127.0.0.1:8000/health` runs `SELECT 1` and returns `{"ok": true}`.

## Run the debug session

In Cursor, start the launch configuration `VisArt`.

That runs `docker compose -f docker-compose.yml -f docker-compose.debug.yml up --build -d`, waits until port 5678 is open, and attaches debugpy. `backend/` on the host is `/app` in the container. Stopping the session runs `docker compose -f docker-compose.yml -f docker-compose.debug.yml down`.

The debug stack also starts Postgres 16 (`visart` / `visart`, database `visart`, host port 5432) and the site on `http://127.0.0.1:8080`. Debug database files are ephemeral. The API process is:

`python -m debugpy --listen 0.0.0.0:5678 --wait-for-client -m uvicorn main:app --host 0.0.0.0 --port 8000`

Its database URL is:

`postgresql+psycopg://visart:visart@db:5432/visart`

`GET http://127.0.0.1:8080/api/health` is proxied to `GET /health`. The prefix is stripped. Direct `GET http://127.0.0.1:8000/health` remains available. Uvicorn starts after Cursor attaches, so `/health` answers after the debugger is connected.

## Server nginx

The public site is served by the nginx already running on the server. This repo does not install or reload it. Add these settings to the existing `visart.app` server. Keep that server's TLS settings.

```nginx
server_name visart.app;
root /var/www/visart.app;

location /api/ {
    proxy_pass http://127.0.0.1:8000/;
}

location / {
    try_files $uri $uri/ =404;
}
```

`root` is the deployed copy of `frontend/`. `/var/www/visart.app` is the example path. `location /api/` strips the prefix, matching the debug container.

A GitHub Pages deploy from the repo root no longer sees `index.html`, because the site files live in `frontend/`.

## Code

Write plain, human-readable code.

- No dead code.
- No function whose body only calls another function.
- No file that only re-exports or wraps one call.
- No test suite unless a later request asks for tests.
- Pydantic and SQLModel are the tools for later request and table models. Do not add empty model modules. Pydantic is already installed through FastAPI and SQLModel.
```

- [ ] **Step 2: Verify the required instructions are present**

Run:

```bash
grep -q "docker compose up --build" AGENTS.md
grep -q "postgresql+psycopg://visart:visart@host.docker.internal:5432/visart" AGENTS.md
grep -q "postgresql+psycopg://visart:visart@db:5432/visart" AGENTS.md
grep -q "proxy_pass http://127.0.0.1:8000/;" AGENTS.md
grep -q "No test suite unless a later request asks for tests." AGENTS.md
echo "agents-ok"
```

Expected: `agents-ok`

- [ ] **Step 3: Commit**

```bash
git add AGENTS.md
git commit -m "$(cat <<'EOF'
document the backend and debug setup

EOF
)"
```
