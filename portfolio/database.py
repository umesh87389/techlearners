import sqlite3
import json
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'portfolio.db')

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS students (
            id TEXT PRIMARY KEY,
            student_name TEXT,
            class_section TEXT,
            roll_no TEXT,
            admission_no TEXT,
            created_at TEXT,
            updated_at TEXT,
            submission_source TEXT,
            status TEXT DEFAULT 'pending_evaluation',
            data_json TEXT
        )
    ''')
    cursor.execute('''
        CREATE INDEX IF NOT EXISTS idx_class ON students(class_section);
    ''')
    cursor.execute('''
        CREATE INDEX IF NOT EXISTS idx_status ON students(status);
    ''')
    conn.commit()
    conn.close()

def save_student_submission(student_id, data, source='send'):
    conn = get_db()
    cursor = conn.cursor()
    
    student_name = (data.get('profile', {}).get('student_name') or data.get('student_name') or 'Unnamed Student').strip()
    class_section = (data.get('profile', {}).get('class_section') or data.get('class_section') or '').strip()
    roll_no = (data.get('profile', {}).get('roll_no') or data.get('roll_no') or '').strip()
    admission_no = (data.get('profile', {}).get('admission_no') or data.get('admission_no') or '').strip()
    
    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    # Check if student exists
    cursor.execute('SELECT id, status, data_json FROM students WHERE id = ?', (student_id,))
    existing = cursor.fetchone()
    
    if existing:
        current_data = {}
        try:
            current_data = json.loads(existing['data_json'])
        except Exception:
            pass
        
        # Preserve teacher sections if already evaluated
        for teacher_sec in ['academic_progress', 'skills', 'teacher_assessment', 'teacher_final_remark']:
            if teacher_sec in current_data and teacher_sec not in data:
                data[teacher_sec] = current_data[teacher_sec]
            elif teacher_sec in current_data and teacher_sec in data:
                if not data[teacher_sec] and current_data[teacher_sec]:
                    data[teacher_sec] = current_data[teacher_sec]
        
        if 'co_curricular' in current_data and 'co_curricular' in data:
            old_rows = current_data.get('co_curricular', [])
            new_rows = data.get('co_curricular', [])
            for i, nr in enumerate(new_rows):
                if i < len(old_rows) and old_rows[i].get('teacher_remark') and not nr.get('teacher_remark'):
                    nr['teacher_remark'] = old_rows[i].get('teacher_remark')
        
        cursor.execute('''
            UPDATE students 
            SET student_name = ?, class_section = ?, roll_no = ?, admission_no = ?, 
                updated_at = ?, submission_source = ?, data_json = ?
            WHERE id = ?
        ''', (student_name, class_section, roll_no, admission_no, now, source, json.dumps(data), student_id))
    else:
        cursor.execute('''
            INSERT INTO students (id, student_name, class_section, roll_no, admission_no, created_at, updated_at, submission_source, status, data_json)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending_evaluation', ?)
        ''', (student_id, student_name, class_section, roll_no, admission_no, now, now, source, json.dumps(data)))
    
    conn.commit()
    conn.close()
    return student_id

def save_teacher_evaluation(student_id, teacher_data):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT data_json FROM students WHERE id = ?', (student_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        return False
    
    data = {}
    try:
        data = json.loads(row['data_json'])
    except Exception:
        pass
    
    # Merge teacher evaluations
    if 'academic_progress' in teacher_data:
        data['academic_progress'] = teacher_data['academic_progress']
    if 'skills' in teacher_data:
        data['skills'] = teacher_data['skills']
    if 'teacher_assessment' in teacher_data:
        data['teacher_assessment'] = teacher_data['teacher_assessment']
    if 'teacher_final_remark' in teacher_data:
        data['teacher_final_remark'] = teacher_data['teacher_final_remark']
    if 'co_curricular_remarks' in teacher_data:
        co_rows = data.get('co_curricular', [])
        for i, rem in enumerate(teacher_data['co_curricular_remarks']):
            if i < len(co_rows):
                co_rows[i]['teacher_remark'] = rem
        data['co_curricular'] = co_rows
    
    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    cursor.execute('''
        UPDATE students
        SET status = 'evaluated', updated_at = ?, data_json = ?
        WHERE id = ?
    ''', (now, json.dumps(data), student_id))
    
    conn.commit()
    conn.close()
    return True

def get_all_students(class_filter=None, status_filter=None, search_query=None):
    conn = get_db()
    cursor = conn.cursor()
    query = 'SELECT id, student_name, class_section, roll_no, admission_no, created_at, updated_at, submission_source, status, data_json FROM students WHERE 1=1'
    params = []
    
    if class_filter and class_filter != 'all':
        query += ' AND class_section = ?'
        params.append(class_filter)
    
    if status_filter and status_filter != 'all':
        query += ' AND status = ?'
        params.append(status_filter)
        
    if search_query:
        query += ' AND (student_name LIKE ? OR roll_no LIKE ? OR admission_no LIKE ?)'
        like_str = f'%{search_query}%'
        params.extend([like_str, like_str, like_str])
        
    query += ' ORDER BY updated_at DESC'
    cursor.execute(query, params)
    rows = cursor.fetchall()
    
    results = []
    for r in rows:
        data = {}
        try:
            data = json.loads(r['data_json'])
        except Exception:
            pass
        results.append({
            'id': r['id'],
            'student_name': r['student_name'],
            'class_section': r['class_section'],
            'roll_no': r['roll_no'],
            'admission_no': r['admission_no'],
            'created_at': r['created_at'],
            'updated_at': r['updated_at'],
            'submission_source': r['submission_source'],
            'status': r['status'],
            'photo_url': data.get('profile', {}).get('photo_data', '')
        })
    conn.close()
    return results

def get_student_by_id(student_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT id, student_name, class_section, roll_no, admission_no, created_at, updated_at, submission_source, status, data_json FROM students WHERE id = ?', (student_id,))
    row = cursor.fetchone()
    conn.close()
    if not row:
        return None
    data = {}
    try:
        data = json.loads(row['data_json'])
    except Exception:
        pass
    return {
        'id': row['id'],
        'student_name': row['student_name'],
        'class_section': row['class_section'],
        'roll_no': row['roll_no'],
        'admission_no': row['admission_no'],
        'created_at': row['created_at'],
        'updated_at': row['updated_at'],
        'submission_source': row['submission_source'],
        'status': row['status'],
        'data': data
    }

def delete_student(student_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM students WHERE id = ?', (student_id,))
    conn.commit()
    conn.close()
    return True
