# TechLearners REST API

FastAPI backend exposing the TechLearners website data and operations as a REST API.

## Run

```bash
cd backend
cp .env.example .env
# edit .env as needed
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints

- `GET /api/health`
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/content`, `GET /api/content/{type}`, `PUT /api/content/{type}` (admin), `POST /api/content/{type}/reset` (admin)
  - types: notes, quizzes, quizQuestions, questionPapers, revisionPapers, chapters, announcements, advertisements, guessPapers
- `GET /api/activity-records`, `POST /api/activity-records`, `GET /api/activity-records/{id}`, `DELETE /api/activity-records/{id}` (admin), `GET /api/activity-records/date/{date}`
- `POST /api/contact`, `GET /api/contact` (admin), `DELETE /api/contact/{id}` (admin)
- `POST /api/quiz-results`, `GET /api/quiz-results` (admin), `DELETE /api/quiz-results/{id}` (admin)

## Auth

Bearer token (JWT). Admin seeded from `TL_ADMIN_EMAIL` / `TL_ADMIN_PASSWORD` (defaults admin@techlearners.in / admin123).
