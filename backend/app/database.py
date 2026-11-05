import json
import sqlite3
from pathlib import Path

from .config import DB_PATH, ADMIN_EMAIL, ADMIN_PASSWORD, CONTENT_TYPES

SCHEMA = """
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'student',
    name TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS activity_records (
    id TEXT PRIMARY KEY,
    teacher_name TEXT NOT NULL,
    class_name TEXT NOT NULL,
    sections TEXT NOT NULL,
    section TEXT,
    activity_name TEXT NOT NULL,
    activity_date TEXT NOT NULL UNIQUE,
    contact TEXT NOT NULL,
    contact_key TEXT NOT NULL,
    contact_type TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS activity_dates (
    date TEXT PRIMARY KEY,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS quiz_results (
    id TEXT PRIMARY KEY,
    student_name TEXT,
    student_email TEXT,
    quiz_id TEXT,
    score INTEGER,
    total INTEGER,
    answers TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS content (
    type TEXT PRIMARY KEY,
    items TEXT NOT NULL,
    updated_at TEXT DEFAULT (datetime('now'))
);
"""


def get_conn() -> sqlite3.Connection:
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db():
    conn = get_conn()
    conn.executescript(SCHEMA)
    conn.commit()

    # Seed admin user if missing
    import bcrypt
    cur = conn.execute("SELECT id FROM users WHERE email = ?", (ADMIN_EMAIL,))
    if cur.fetchone() is None:
        hashed = bcrypt.hashpw(ADMIN_PASSWORD.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
        conn.execute(
            "INSERT INTO users (email, password_hash, role, name) VALUES (?,?,?,?)",
            (ADMIN_EMAIL, hashed, "admin", "Admin"),
        )
        conn.commit()

    # Seed content from data/*.json if empty
    for ctype in CONTENT_TYPES:
        cur = conn.execute("SELECT type FROM content WHERE type = ?", (ctype,))
        if cur.fetchone() is None:
            path = Path(__file__).resolve().parent.parent.parent / "data" / f"{ctype}.json"
            items = []
            if path.exists():
                try:
                    with open(path, "r", encoding="utf-8") as f:
                        data = json.load(f)
                    items = data if isinstance(data, list) else data.get("items", [])
                except Exception:
                    items = []
            conn.execute(
                "INSERT INTO content (type, items) VALUES (?, ?)",
                (ctype, json.dumps(items)),
            )
    conn.commit()
    conn.close()


def row_to_dict(row):
    if row is None:
        return None
    return {k: row[k] for k in row.keys()}
