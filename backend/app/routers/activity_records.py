import json
import uuid

from fastapi import APIRouter, Depends, HTTPException

from ..config import ALLOWED_SECTIONS
from ..database import get_conn
from ..dependencies import get_current_user, require_admin
from ..schemas import ActivityRecordIn, ActivityRecordOut

router = APIRouter(prefix="/api/activity-records", tags=["activity-records"])


def _normalize_contact(value: str) -> str:
    v = value.strip()
    if "@" in v:
        return v.lower()
    return "".join(c for c in v if c.isdigit())


def _row_to_out(row) -> dict:
    d = dict(row)
    try:
        d["sections"] = json.loads(d["sections"])
    except Exception:
        d["sections"] = [s.strip() for s in (d.get("section") or "").split(",") if s.strip()]
    return d


@router.get("")
def list_records(user=Depends(get_current_user)):
    conn = get_conn()
    rows = conn.execute(
        "SELECT * FROM activity_records ORDER BY created_at DESC"
    ).fetchall()
    conn.close()
    return [_row_to_out(r) for r in rows]


@router.get("/date/{date}")
def is_date_taken(date: str):
    conn = get_conn()
    row = conn.execute("SELECT date FROM activity_dates WHERE date = ?", (date,)).fetchone()
    conn.close()
    return {"date": date, "taken": row is not None}


@router.post("", status_code=201)
def create_record(payload: ActivityRecordIn):
    teacher_name = payload.teacherName.strip()
    class_name = payload.className.strip()
    sections = [s.strip() for s in payload.sections if s.strip()]
    activity_name = payload.activityName.strip()
    activity_date = payload.activityDate.strip()
    contact = payload.contact.strip()

    if not all([teacher_name, class_name, sections, activity_name, activity_date, contact]):
        raise HTTPException(status_code=400, detail="Please fill in all required fields.")
    if any(s not in ALLOWED_SECTIONS for s in sections):
        raise HTTPException(status_code=400, detail="One or more selected sections are invalid.")

    contact_key = _normalize_contact(contact)
    if not contact_key:
        raise HTTPException(status_code=400, detail="A valid email or phone number is required.")

    record_id = str(uuid.uuid4())
    conn = get_conn()
    try:
        # transaction: date must be free
        conn.execute("BEGIN IMMEDIATE")
        existing = conn.execute(
            "SELECT date FROM activity_dates WHERE date = ?", (activity_date,)
        ).fetchone()
        if existing:
            conn.rollback()
            raise HTTPException(status_code=409, detail="This activity date has already been chosen by another teacher.")
        conn.execute(
            """INSERT INTO activity_records
            (id, teacher_name, class_name, sections, section, activity_name, activity_date,
             contact, contact_key, contact_type)
            VALUES (?,?,?,?,?,?,?,?,?,?)""",
            (
                record_id, teacher_name, class_name, json.dumps(sections), ", ".join(sections),
                activity_name, activity_date, contact, contact_key,
                "email" if "@" in contact else "phone",
            ),
        )
        conn.execute("INSERT INTO activity_dates (date) VALUES (?)", (activity_date,))
        conn.commit()
    except HTTPException:
        raise
    except Exception as exc:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(exc))
    finally:
        conn.close()

    conn = get_conn()
    row = conn.execute("SELECT * FROM activity_records WHERE id = ?", (record_id,)).fetchone()
    conn.close()
    return _row_to_out(row)


@router.get("/{record_id}")
def get_record(record_id: str, user=Depends(get_current_user)):
    conn = get_conn()
    row = conn.execute("SELECT * FROM activity_records WHERE id = ?", (record_id,)).fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Record not found")
    return _row_to_out(row)


@router.delete("/{record_id}")
def delete_record(record_id: str, user=Depends(require_admin)):
    conn = get_conn()
    row = conn.execute("SELECT activity_date FROM activity_records WHERE id = ?", (record_id,)).fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Record not found")
    activity_date = row["activity_date"]
    conn.execute("DELETE FROM activity_records WHERE id = ?", (record_id,))
    if activity_date:
        conn.execute("DELETE FROM activity_dates WHERE date = ?", (activity_date,))
    conn.commit()
    conn.close()
    return {"deleted": True, "id": record_id}
