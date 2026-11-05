import json
import uuid

from fastapi import APIRouter, Depends, HTTPException

from ..database import get_conn
from ..dependencies import require_admin
from ..schemas import QuizResultIn

router = APIRouter(prefix="/api/quiz-results", tags=["quiz-results"])


def _sort(rows):
    return sorted(rows, key=lambda r: r["created_at"] or "", reverse=True)


@router.post("", status_code=201)
def submit_result(payload: QuizResultIn):
    rid = str(uuid.uuid4())
    conn = get_conn()
    conn.execute(
        "INSERT INTO quiz_results (id, student_name, student_email, quiz_id, score, total, answers) "
        "VALUES (?,?,?,?,?,?,?)",
        (
            rid, payload.studentName, payload.studentEmail, payload.quizId,
            payload.score, payload.total,
            json.dumps(payload.answers) if payload.answers is not None else None,
        ),
    )
    conn.commit()
    row = conn.execute("SELECT * FROM quiz_results WHERE id = ?", (rid,)).fetchone()
    conn.close()
    d = dict(row)
    if d.get("answers"):
        try:
            d["answers"] = json.loads(d["answers"])
        except Exception:
            pass
    return d


@router.get("")
def list_results(user=Depends(require_admin)):
    conn = get_conn()
    rows = conn.execute("SELECT * FROM quiz_results").fetchall()
    conn.close()
    out = []
    for r in rows:
        d = dict(r)
        if d.get("answers"):
            try:
                d["answers"] = json.loads(d["answers"])
            except Exception:
                pass
        out.append(d)
    return _sort(out)


@router.delete("/{result_id}")
def delete_result(result_id: str, user=Depends(require_admin)):
    conn = get_conn()
    conn.execute("DELETE FROM quiz_results WHERE id = ?", (result_id,))
    conn.commit()
    conn.close()
    return {"deleted": True, "id": result_id}
