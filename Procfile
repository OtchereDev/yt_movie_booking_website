release: python manage.py migrate
web: gunicorn movieWebsite.wsgi --logfile -
worker: celery -A movieWebsite worker -log info 