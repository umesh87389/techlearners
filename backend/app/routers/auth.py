import uuid

from fastapi import APIRouter, Depends, HTTPException, status

from ..auth import create_access_token, hash_password, verify_password
from ..database import get_conn
from ..dependencies import get_current_user
from ..schemas import LoginIn, RegisterIn, TokenResponse, UserOut

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=TokenResponse)
def register(payload: RegisterIn):
    conn = get_conn()
    existing = conn.execute("SELECT id FROM users WHERE email = ?", (payload.email,)).fetchone()
    if existing:
        conn.close()
        raise HTTPException(status_code=400, detail="Email already registered")
    conn.execute(
        "INSERT INTO users (email, password_hash, role, name) VALUES (?,?,?,?)",
        (payload.email, hash_password(payload.password), "student", payload.name),
    )
    conn.commit()
    conn.close()
    token = create_access_token(payload.email, "student")
    return TokenResponse(access_token=token, role="student")


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginIn):
    conn = get_conn()
    row = conn.execute(
        "SELECT email, password_hash, role FROM users WHERE email = ?", (payload.email,)
    ).fetchone()
    conn.close()
    if not row or not verify_password(payload.password, row["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token(row["email"], row["role"])
    return TokenResponse(access_token=token, role=row["role"])


@router.get("/me", response_model=UserOut)
def me(user=Depends(get_current_user)):
    conn = get_conn()
    row = conn.execute(
        "SELECT id, email, role, name FROM users WHERE email = ?", (user["email"],)
    ).fetchone()
    conn.close()
    return dict(row)
