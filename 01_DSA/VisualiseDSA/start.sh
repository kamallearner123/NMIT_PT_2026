#!/bin/bash

# Check if .venv exists, if not create it
if [ ! -d ".venv" ]; then
    python3 -m venv .venv
fi

# Activate virtual environment
source .venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Run migrations and start server
python3 manage.py migrate
python3 manage.py runserver
