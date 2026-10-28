# Backend / frontend split

VisArt is a static art-study site. This change splits the repo into a static frontend and a FastAPI backend, with PostgreSQL on the host for the server and PostgreSQL in Docker for local debugging. The database has no tables. The course page moves with the site and stays unwired.

## Layout

```
AGENTS.md
docker-compose.yml
docker-compose.debug.yml
.vscode/launch.json
.vscode/tasks.json
backend/
  Dockerfile
  pyproject.toml
  uv.lock
  main.py
  db.py
frontend/
  Dockerfile
  nginx.conf
  index.html
  style.css
  css/
  js/
  data/
  cookie_policy.html
  impressum.html
  privacy_policy.html
  robots.txt
  favicon.ico
  small_banner_1.png
  small_banner_2.png
  small_banner_3.png
  small_banner_4.png
```

`README.md`, `notes.md`, `image_process.py`, and `CNAME` stay at the repo root. `image_process.py` is a local image-optimization script and is not part of either container.

These files move into `frontend/` unchanged: the HTML pages, `style.css`, `css/`, `js/`, `data/`, `robots.txt`, `favicon.ico`, and the four `small_banner_*.png` files. The course nav link stays commented out. No page calls the API.

Moving `index.html` out of the repo root means a GitHub Pages deploy from this repository no longer finds the site. The server nginx setup below is how the site is served.

## Runtime

Two Compose files.

`docker-compose.yml` is the server stack. It runs only the backend. The process listens on port 8000 inside the container, published as `127.0.0.1:8000` on the host. `DATABASE_URL` defaults to:

`postgresql+psycopg://visart:visart@host.docker.internal:5432/visart`

Set `DATABASE_URL` in the environment when the host database uses different credentials or a different database name. The backend service sets `extra_hosts: ["host.docker.internal:host-gateway"]` so that name resolves on Linux.

`docker-compose.debug.yml` is the local difference, applied together with the server file. It adds:

- Postgres 16, user `visart`, password `visart`, database `visart`, published on host port 5432. Its data is ephemeral and is removed by `docker compose down`.
- The frontend container, nginx, published on host port 8080. It `depends_on` the backend so the `backend` hostname exists before nginx starts.
- Backend overrides: `DATABASE_URL=postgresql+psycopg://visart:visart@db:5432/visart`, source mounted from `./backend` onto `/app`, port 5678 published, and `depends_on: db`.

The debug command replaces the image command:

`python -m debugpy --listen 0.0.0.0:5678 --wait-for-client -m uvicorn main:app --host 0.0.0.0 --port 8000`

Host port 8000 stays the binding from the server file (`127.0.0.1:8000`). The debug file adds port 5678 and does not bind port 8000 a second time.

Cursor launch configuration name: `VisArt`. It attaches debugpy to `localhost:5678` and maps `${workspaceFolder}/backend` to `/app`. The preLaunch task runs:

`docker compose -f docker-compose.yml -f docker-compose.debug.yml up --build -d`

then waits for port 5678, using bash `/dev/tcp`, up to 10 seconds. If the port never opens, the task exits non-zero and Cursor does not attach. Stopping the session runs `docker compose -f docker-compose.yml -f docker-compose.debug.yml down`.

## Backend

`backend/pyproject.toml` is a uv project for Python 3.13. Direct dependencies:

- `fastapi`
- `uvicorn`
- `sqlmodel`
- `psycopg[binary]`
- `debugpy`

Pydantic is installed because FastAPI and SQLModel depend on it. No module imports Pydantic until a model exists. Generate `uv.lock` with `uv lock` and copy it into the image.

`db.py` does one thing: create a SQLModel engine from the `DATABASE_URL` environment variable.

`main.py` creates the FastAPI app and `GET /health`. The handler opens a connection, runs `SELECT 1`, and returns `{"ok": true}`. There is no `create_all`, no table, and no session helper.

The backend image uses `python:3.13-slim` and uv. Working directory is `/app`. Dependencies install into `/opt/venv` (`UV_PROJECT_ENVIRONMENT=/opt/venv`, and that `bin` directory is on `PATH`). The debug mount of `./backend` over `/app` therefore leaves the virtualenv in place. The image command is Uvicorn on `0.0.0.0:8000`.

A missing `DATABASE_URL` raises `KeyError` while importing `db.py`, so the process exits. If PostgreSQL refuses the connection, `/health` returns FastAPI's default server error. There is no custom exception handler. The engine connects on first use, so the API process can start before Postgres accepts connections. `/health` fails until it does, then succeeds. No startup wait is added.

## Frontend container

Used by the debug Compose file only. The server does not start it.

`frontend/Dockerfile` is `nginx:alpine`. It copies `nginx.conf` to `/etc/nginx/conf.d/default.conf`, then copies the site into `/usr/share/nginx/html`: the HTML files, `style.css`, `robots.txt`, `favicon.ico`, the banner PNGs, and the `css/`, `js/`, and `data/` directories. `nginx.conf` and the Dockerfile are not part of that site copy.

`frontend/nginx.conf`:

- Listens on port 80.
- Serves files from `/usr/share/nginx/html`.
- `location /api/` proxies to `http://backend:8000/`, so the `/api` prefix is stripped. `GET /api/health` on port 8080 reaches `GET /health` in FastAPI.
- Other paths use `try_files` and return 404 when a file is missing.

`GET http://127.0.0.1:8000/health` still talks to FastAPI directly during a debug session.

## Server nginx

The machine that hosts VisArt already runs nginx. That process is the public web server. This repo does not install or reload it. `AGENTS.md` records a server block the operator adds there:

- `server_name visart.app`
- `root` is the deployed copy of `frontend/`. The example path is `/var/www/visart.app`.
- `location /api/` proxies to `http://127.0.0.1:8000/` and strips the prefix, matching the debug container.
- Other paths serve files from `root` and return 404 when a file is missing.
- TLS stays in the existing nginx configuration. This project does not request or embed certificates.

## AGENTS.md

Root file `AGENTS.md` (the name Cursor reads). It states:

- What VisArt is, and this layout.
- How to start a server stack (`docker compose up --build`) and how to start the Cursor `VisArt` debug session.
- The host-Postgres versus debug-Postgres rule, both database URLs, and the server nginx block.
- The backend is `main.py` and `db.py`. The database has no tables until a later discussion.
- The course page is static and unwired. Do not add course models, lecture content, comments, or gallery metadata in this structure.
- `image_process.py` stays a local script.
- Code is plain and human-readable. No dead code. No function whose body only calls another function. No files that only re-export or wrap a single call. No test suite unless a later request asks for tests.
- Pydantic and SQLModel are the tools for later request and table models. Do not introduce them as empty modules now.

## Out of scope

- Course and lecture tables, seed data, and a course API.
- Connecting the course page to the API.
- User accounts, comments, and shared exercise results.
- Reference-gallery metadata in the database.
- Moving `image_process.py` into the backend.
- Tests.
- Editing the live server nginx configuration from this repo.
