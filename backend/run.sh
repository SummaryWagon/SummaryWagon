#!/bin/bash
python scripts/check_requirements.py requirements.txt
if [ $? -eq 1 ]
then
    echo Installing missing packages...
    pip install -r requirements.txt
fi
python -m autogpt --continuous --continuous-limit 1
echo "Waiting for the next request from client..."
