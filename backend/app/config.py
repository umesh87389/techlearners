from pathlib import Path
import os
try:
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).resolve().parent.parent / ".env")
except Exception:
    pass

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR.parent / "data"
DB_PATH = BASE_DIR / "techlearners.db"

SECRET_KEY = os.getenv("TL_SECRET_KEY", "change-me-in-production-please-use-a-long-random-string")
ADMIN_EMAIL = os.getenv("TL_ADMIN_EMAIL", "admin@techlearners.in")
ADMIN_PASSWORD = os.getenv("TL_ADMIN_PASSWORD", "admin123")
TOKEN_EXPIRE_MINUTES = int(os.getenv("TL_TOKEN_EXPIRE_MINUTES", "1440"))

CORS_ORIGINS = [o.strip() for o in os.getenv("TL_CORS_ORIGINS", "*").split(",") if o.strip()]

CONTENT_TYPES = [
    "notes", "quizzes", "quizQuestions", "questionPapers", "revisionPapers",
    "chapters", "announcements", "advertisements", "guessPapers",
]

ALLOWED_SECTIONS = ["A", "B", "C", "Science", "Commerce", "Humanities"]
