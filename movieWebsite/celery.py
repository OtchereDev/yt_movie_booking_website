from celery import Celery
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE","movieWebsite.settings")

app= Celery("movieWebsite")

app.config_from_object("django.conf:settings",namespace="CELERY")

app.conf.update(BROKER_URL=os.environ["REDIS_URL"],
                    CELERY_RESULT_BACKEND=os.environ['REDIS_URL'])

app.autodiscover_tasks()