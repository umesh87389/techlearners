import os
import uuid
import json
from datetime import datetime
from flask import Flask, render_template, request, jsonify, redirect, url_for, session, send_from_directory
import database

app = Flask(__name__, template_folder='templates', static_folder='static')
app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'shm_academy_secure_key_92817346')

# Teacher access credential (kept strictly on server side; students have zero access to this)
TEACHER_PASSWORD = os.environ.get('TEACHER_PASSWORD', 'shm@teacher2026')

database.init_db()

CLASSES_SECTIONS = [
    "Class 6 - Section A",
    "Class 6 - Section B",
    "Class 7 - Section A",
    "Class 7 - Section B",
    "Class 8 - Section A",
    "Class 8 - Section B",
    "Class 9 - Section A",
    "Class 9 - Section B",
    "Class 10 - Section A",
    "Class 10 - Section B",
    "Class 11 - Section A",
    "Class 11 - Section B",
    "Class 12 - Section A",
    "Class 12 - Section B"
]

@app.route('/')
@app.route('/portfolio')
def student_portfolio():
    return render_template('portfolio.html', classes_sections=CLASSES_SECTIONS)

@app.route('/api/submit', methods=['POST'])
def api_submit():
    try:
        data = request.get_json(force=True)
        if not data:
            return jsonify({'success': False, 'error': 'No data provided'}), 400
        
        student_id = data.get('id')
        if not student_id:
            # Generate deterministic or random UUID
            student_id = 'stu_' + str(uuid.uuid4())[:8]
        
        source = data.get('source', 'send')
        saved_id = database.save_student_submission(student_id, data, source=source)
        
        return jsonify({
            'success': True,
            'student_id': saved_id,
            'message': 'Portfolio successfully saved and sent to Teacher Dashboard',
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/teacher/login', methods=['GET', 'POST'])
def teacher_login():
    error = None
    if request.method == 'POST':
        pwd = request.form.get('password', '').strip()
        if pwd == TEACHER_PASSWORD:
            session['teacher_auth'] = True
            session['teacher_name'] = 'Class / Subject Teacher'
            return redirect(url_for('teacher_dashboard'))
        else:
            error = 'Invalid Teacher Passcode. Access denied.'
    return render_template('teacher_login.html', error=error)

@app.route('/teacher/logout')
def teacher_logout():
    session.clear()
    return redirect(url_for('teacher_login'))

@app.route('/teacher')
@app.route('/teacher/dashboard')
def teacher_dashboard():
    if not session.get('teacher_auth'):
        return redirect(url_for('teacher_login'))
    
    class_filter = request.args.get('class', 'all')
    status_filter = request.args.get('status', 'all')
    search_q = request.args.get('q', '').strip()
    
    students = database.get_all_students(
        class_filter=class_filter if class_filter != 'all' else None,
        status_filter=status_filter if status_filter != 'all' else None,
        search_query=search_q if search_q else None
    )
    
    # Calculate stats
    all_raw = database.get_all_students()
    total_count = len(all_raw)
    pending_count = sum(1 for s in all_raw if s['status'] == 'pending_evaluation')
    evaluated_count = sum(1 for s in all_raw if s['status'] == 'evaluated')
    
    return render_template(
        'teacher_dashboard.html',
        students=students,
        classes_sections=CLASSES_SECTIONS,
        selected_class=class_filter,
        selected_status=status_filter,
        search_query=search_q,
        total_count=total_count,
        pending_count=pending_count,
        evaluated_count=evaluated_count
    )

@app.route('/teacher/evaluate/<student_id>')
def teacher_evaluate(student_id):
    if not session.get('teacher_auth'):
        return redirect(url_for('teacher_login'))
    
    student = database.get_student_by_id(student_id)
    if not student:
        return "Student submission not found", 404
        
    return render_template('teacher_evaluate.html', student=student, classes_sections=CLASSES_SECTIONS)

@app.route('/teacher/print/<student_id>')
def teacher_print(student_id):
    if not session.get('teacher_auth'):
        return redirect(url_for('teacher_login'))
        
    student = database.get_student_by_id(student_id)
    if not student:
        return "Student submission not found", 404
        
    return render_template('teacher_print.html', student=student)

@app.route('/api/teacher/evaluate/<student_id>', methods=['POST'])
def api_teacher_evaluate(student_id):
    if not session.get('teacher_auth'):
        return jsonify({'success': False, 'error': 'Unauthorized'}), 401
        
    try:
        eval_data = request.get_json(force=True)
        success = database.save_teacher_evaluation(student_id, eval_data)
        if success:
            return jsonify({'success': True, 'message': 'Teacher evaluation saved successfully'})
        else:
            return jsonify({'success': False, 'error': 'Student not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/teacher/delete/<student_id>', methods=['POST'])
def api_teacher_delete(student_id):
    if not session.get('teacher_auth'):
        return jsonify({'success': False, 'error': 'Unauthorized'}), 401
    
    database.delete_student(student_id)
    return jsonify({'success': True, 'message': 'Student record deleted'})

# Static file serving compatibility
@app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory('assets', filename)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    print(f"Starting SHM Academy Portfolio Platform on http://127.0.0.1:{port}")
    app.run(host='0.0.0.0', port=port, debug=False)
