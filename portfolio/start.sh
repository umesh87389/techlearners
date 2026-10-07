#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"
export PORT=${PORT:-8080}
echo "Starting SHM Academy Student Portfolio System on port $PORT..."
echo "Student Portfolio:  http://localhost:$PORT/"
echo "Teacher Dashboard:  http://localhost:$PORT/teacher"
echo "Teacher Passcode:   shm@teacher2026"
python3 app.py
