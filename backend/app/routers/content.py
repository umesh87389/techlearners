import json

from fastapi import APIRouter, Depends, HTTPException

from ..config import CONTENT_TYPES
from ..database import get_conn
from ..dependencies import require_admin
from ..schemas import ContentUpdateIn

router = APIRouter(prefix="/api/content", tags=["content"])


def _get_items(conn, ctype: str):
    row = conn.execute("SELECT items FROM content WHERE type = ?", (ctype,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Unknown content type")
    try:
        return json.loads(row["items"])
    except Exception:
        return []


@router.get("")
def list_types():
    return {"types": CONTENT_TYPES}


@router.get("/{ctype}")
def get_content(ctype: str):
    if ctype not in CONTENT_TYPES:
        raise HTTPException(status_code=404, detail="Unknown content type")
    conn = get_conn()
    items = _get_items(conn, ctype)
    conn.close()
    return {"type": ctype, "items": items, "count": len(items)}


@router.put("/{ctype}")
def update_content(ctype: str, payload: ContentUpdateIn, user=Depends(require_admin)):
    if ctype not in CONTENT_TYPES:
        raise HTTPException(status_code=404, detail="Unknown content type")
    conn = get_conn()
    conn.execute(
        "INSERT INTO content (type, items, updated_at) VALUES (?,?,datetime('now')) "
        "ON CONFLICT(type) DO UPDATE SET items=excluded.items, updated_at=excluded.updated_at",
        (ctype, json.dumps(payload.items)),
    )
    conn.commit()
    conn.close()
    return {"type": ctype, "count": len(payload.items), "updated": True}


@router.post("/{ctype}/reset")
def reset_content(ctype: str, user=Depends(require_admin)):
    if ctype not in CONTENT_TYPES:
        raise HTTPException(status_code=404, detail="Unknown content type")
    # reload from data file
    from pathlib import Path
    path = Path(__file__).resolve().parent.parent.parent.parent / "data" / f"{ctype}.json"
    items = []
    if path.exists():
        try:
            with open(path, "r", encoding="utf-8") as f:
                data = json.load(f)
            items = data if isinstance(data, list) else data.get("items", [])
        except Exception:
            items = []
    conn = get_conn()
    conn.execute(
        "INSERT INTO content (type, items, updated_at) VALUES (?,?,datetime('now')) "
        "ON CONFLICT(type) DO UPDATE SET items=excluded.items, updated_at=excluded.updated_at",
        (ctype, json.dumps(items)),
    )
    conn.commit()
    conn.close()
    return {"type": ctype, "count": len(items), "reset": True}
