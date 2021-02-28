release: python manage.py migrate
web: gunicorn movieWebsite.wsgi --log-file -
worker: celery -A movieWebsite worker --loglevel=INFO