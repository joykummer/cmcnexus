#!/bin/bash
python -c "import time; time.sleep(3)" # Wait for postgres to start up
python manage.py migrate
python manage.py collectstatic --no-input
rm -rf /frontend/build/* && cp -r /frontend_tmp/* /frontend
gunicorn -w 4 -b 0.0.0.0:8000 luna.wsgi:application
