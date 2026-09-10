# 🎓 SHM Academy - Student Portfolio Platform

An official digital recreation of the **SHM Academy Student Portfolio** based directly on `portfolio.docx` from WhatsApp.

> **Motto**: “Infinite Knowledge Through Education”

---

## 🌟 Key Features

1. **Exact Document Fidelity**:
   - Recreated strictly according to `portfolio.docx`.
   - No extra subjects, tracks, or unrelated content added.
   - All 17 sections, tables, prompts, and declarations reproduced verbatim.

2. **Class & Section Dropdown**:
   - Single standardized dropdown covering **Class 6 to 12** along with **Sections A and B** (14 options: Class 6 - Section A through Class 12 - Section B).
   - Automatically reflects in the "About Me" statement ("I study in Class ... at SHM Academy").

3. **Separate, Locked Teacher Sections**:
   - **Academic Progress** (marks/grades for English, Hindi, Mathematics, Science, Social Science, Computer/IT, Other, and Academic Achievement) is locked for students.
   - **My Skills** (1–5 ratings for Communication, Reading, Writing, Creativity, Problem Solving, Teamwork, Leadership, Time Management, Digital Skills) is locked for students.
   - **Teacher's Assessment**, **Remarks**, and **Signatures** are locked for students.
   - Only accessible and editable by the teacher through the secure Teacher Dashboard.

4. **Student Isolation & Zero PIN Leakage**:
   - Students have **NO access** to the Teacher Dashboard or any PIN.
   - No teacher dashboard links, buttons, or PINs appear in the student UI or client-side JavaScript.
   - The Teacher Dashboard is protected by server-side session authentication.

5. **Automated Save on "Send"**:
   - Clicking **🚀 Send Portfolio**: Automatically validates, saves to the database, and sends the record to the Teacher's Dashboard.

6. **Teacher Evaluation & Reporting**:
   - Dedicated Faculty Portal (`/teacher`) protected by server-verified passcode.
   - Search & filter by Class & Section or Evaluation Status.
   - Faculty can review student inputs, enter academic marks, rate skills (1–5), complete the 8-area assessment, and sign off.
   - Print full evaluated portfolio with both student and teacher remarks.

---

## 🚀 Running the System

To start the server:

```bash
cd /data/data/com.termux/files/home/school-portfolio
./start.sh
```

Or directly with Python:

```bash
python3 app.py
```

### Access URLs:
* **Student Portfolio**: `http://localhost:8080/`
* **Teacher Dashboard**: `http://localhost:8080/teacher`
* **Default Teacher Passcode**: `shm@teacher2026` (configurable via `TEACHER_PASSWORD` environment variable)

---

## 📁 Architecture

```
school-portfolio/
├── app.py                      # Flask backend (routes, auth, API)
├── database.py                 # SQLite database storage & CRUD operations
├── portfolio.db                # SQLite database file
├── start.sh                    # Startup helper script
├── templates/
│   ├── portfolio.html          # Official Student Portfolio form
│   ├── teacher_login.html      # Secure Faculty Login page
│   ├── teacher_dashboard.html  # Faculty Roster & Review Dashboard
│   ├── teacher_evaluate.html   # Teacher Marks & Skills Evaluation screen
│   └── teacher_print.html      # Full evaluated portfolio print view
├── static/
│   ├── css/
│   │   └── portfolio.css       # Clean document typography & A4 print CSS
│   └── js/
│       └── portfolio.js        # Autosave, photo upload, send/print sync
└── assets/
    └── school-logo.jpg         # Official SHM Academy emblem
```
