
from movieWebsite.celery import app
from .helpers import email_customer

@app.task(name="emailing customer")
def mailing(first_name,email,seat_no,movie_title):
    email_customer(first_name,seat_no,movie_title,email)