#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting cleanup for VisualiseConcpet...${NC}"

# 1. Remove __pycache__ directories
echo -e "  - Removing __pycache__ directories..."
find . -path "*/__pycache__" -type d -exec rm -rf {} +

# 2. Remove .pyc files
echo -e "  - Removing .pyc files..."
find . -name "*.pyc" -delete

# 3. Remove the SQLite database
if [ -f "db.sqlite3" ]; then
    echo -e "  - Removing db.sqlite3 database..."
    rm db.sqlite3
fi

# 4. Remove migrations (keeping __init__.py)
echo -e "  - Cleaning migration files (keeping __init__.py)..."
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc" -delete

# 5. Remove collected static files (if any)
if [ -d "staticfiles" ]; then
    echo -e "  - Removing staticfiles directory..."
    rm -rf staticfiles
fi

# 6. Optional: Clean logs or temporary files if they exist
if [ -f "debug.log" ]; then
    echo -e "  - Removing debug.log..."
    rm debug.log
fi

echo -e "${GREEN}Project cleaned successfully!${NC}"
echo -e "${BLUE}To restart the project, run: ./start.sh${NC}"
