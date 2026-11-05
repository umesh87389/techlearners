from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import CORS_ORIGINS
from .database import init_db
from .routers import activity_records, auth, contact, content, quiz_results

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(
    title="TechLearners API",
    description="REST API for the TechLearners educational website (techlearners.in)",
    version="1.0.0",
    lifespan=lifespan,
)

origins = ["*"] if CORS_ORIGINS == ["*"] or not CORS_ORIGINS else CORS_ORIGINS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(content.router)
app.include_router(activity_records.router)
app.include_router(contact.router)
app.include_router(quiz_results.router)


@app.get("/api/health", tags=["health"])
def health():
    return {"status": "ok", "service": "techlearners-api"}


@app.get("/")
def root():
    return {"message": "TechLearners API. See /docs for Swagger UI."}
