from typing import List, Optional, Any
from pydantic import BaseModel, EmailStr, Field


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str


class UserOut(BaseModel):
    id: int
    email: str
    role: str
    name: Optional[str] = None


class RegisterIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    name: Optional[str] = None


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class ActivityRecordIn(BaseModel):
    teacherName: str
    className: str
    sections: List[str]
    activityName: str
    activityDate: str
    contact: str


class ActivityRecordOut(BaseModel):
    id: str
    teacherName: str
    className: str
    sections: List[str]
    section: Optional[str] = None
    activityName: str
    activityDate: str
    contact: str
    contactKey: Optional[str] = None
    contactType: Optional[str] = None
    createdAt: Optional[str] = None


class ContactIn(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    subject: Optional[str] = None
    message: str


class ContactOut(BaseModel):
    id: str
    name: Optional[str] = None
    email: Optional[str] = None
    subject: Optional[str] = None
    message: Optional[str] = None
    createdAt: Optional[str] = None


class QuizResultIn(BaseModel):
    studentName: Optional[str] = None
    studentEmail: Optional[str] = None
    quizId: Optional[str] = None
    score: Optional[int] = None
    total: Optional[int] = None
    answers: Optional[Any] = None


class QuizResultOut(BaseModel):
    id: str
    studentName: Optional[str] = None
    studentEmail: Optional[str] = None
    quizId: Optional[str] = None
    score: Optional[int] = None
    total: Optional[int] = None
    answers: Optional[Any] = None
    createdAt: Optional[str] = None


class ContentUpdateIn(BaseModel):
    items: List[Any]
