from fastapi import FastAPI
from sqlmodel import text

from db import engine

app = FastAPI()


@app.get("/health")
def health():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1")).one()
    return {"ok": True}
