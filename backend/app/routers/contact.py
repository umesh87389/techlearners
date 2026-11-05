import uuid

from fastapi import APIRouter, Depends, HTTPException

from ..database import get_conn
from ..dependencies import require_admin
from ..schemas import ContactIn, ContactOut

router = APIRouter(prefix="/api/contact", tags=["contact"])


def _sort(rows):
    return sorted(rows, key=lambda r: r["created_at"] or "", reverse=True)


@router.post("", status_code=201)
def submit_contact(payload: ContactIn):
    if not payload.message or not payload.message.strip():
        raise HTTPException(status_code=400, detail="Message is required.")
    cid = str(uuid.uuid4())
    conn = get_conn()
    conn.execute(
        "INSERT INTO contact_messages (id, name, email, subject, message) VALUES (?,?,?,?,?)",
        (cid, payload.name, payload.email, payload.subject, payload.message),
    )
    conn.commit()
    row = conn.execute("SELECT * FROM contact_messages WHERE id = ?", (cid,)).fetchone()
    conn.close()
    return dict(row)


@router.get("")
def list_messages(user=Depends(require_admin)):
    conn = get_conn()
    rows = conn.execute("SELECT * FROM contact_messages").fetchall()
    conn.close()
    return _sort([dict(r) for r in rows])


@router.delete("/{message_id}")
def delete_message(message_id: str, user=Depends(require_admin)):
    conn = get_conn()
    conn.execute("DELETE FROM contact_messages WHERE id = ?", (message_id,))
    conn.commit()
    conn.close()
    return {"deleted": True, "id": message_id}
