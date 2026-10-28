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
- `backend/.venv` is the local uv environment and is gitignored.

The database has no tables. Do not add tables, `create_all`, course or lecture models, seed data, comments, accounts, or gallery metadata until that is discussed.

The course page is the static markup moved with the site. Its nav link stays commented out. Do not connect it to the API in this structure.

## Run the server stack

```bash
docker compose up --build
```

This starts only the backend, bound to `127.0.0.1:8764`. `DATABASE_URL` defaults to:

`postgresql+psycopg://visart:visart@host.docker.internal:5432/visart`

Set `DATABASE_URL` when the host database name or credentials differ. The Compose service maps `host.docker.internal` to the host gateway.

`GET http://127.0.0.1:8764/health` runs `SELECT 1` and returns `{"ok": true}`.

## Run the debug session

In Cursor, start the launch configuration `VisArt`.

That runs `docker compose -f docker-compose.yml -f docker-compose.debug.yml up --build -d`, waits until port 5680 is open, and attaches debugpy. `backend/` on the host is `/app` in the container. Stopping the session runs `docker compose -f docker-compose.yml -f docker-compose.debug.yml down`.

The debug stack also starts Postgres 16 (`visart` / `visart`, database `visart`) and the site on `http://127.0.0.1:8080`. The frontend container mounts `./frontend` at its document root and uses that directory as its working directory. Inside Compose the database is `db:5432`. On the host it is published as port 5678. Debugpy listens on port 5678 inside the API container and is published on host port 5680. Debug database files are ephemeral. The API process is:

`python -m debugpy --listen 0.0.0.0:5678 --wait-for-client -m uvicorn main:app --host 0.0.0.0 --port 8000`

Its database URL is:

`postgresql+psycopg://visart:visart@db:5432/visart`

`GET http://127.0.0.1:8080/api/health` is proxied to `GET /health`. The prefix is stripped. Direct `GET http://127.0.0.1:8764/health` remains available. Uvicorn starts after Cursor attaches, so `/health` answers after the debugger is connected.

## Server nginx

The public site is served by the nginx already running on the server. This repo does not install or reload it. Add these settings to the existing `visart.app` server. Keep that server's TLS settings.

```nginx
server_name visart.app;
root /var/www/visart.app;

location /api/ {
    proxy_pass http://127.0.0.1:8764/;
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
