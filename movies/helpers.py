import hmac
import hashlib
from django.conf import settings

from django.template.loader import render_to_string
from django.core.mail import send_mail

def verify_webook(request):
    secret=bytes(settings.PAYSTACK_SECRET,"utf-8")
    digester=hmac.new(secret,request.body,hashlib.sha512)
    calculated_signature=digester.hexdigest()
    if calculated_signature== request.META["HTTP_X_PAYSTACK_SIGNATURE"]:
        return True
    return False


def email_customer(first_name,seat_no,movie_title,email):
    render_msg=render_to_string("email_template.html",{
        "first_name":first_name,
        "movie_title":movie_title,
        "seat_no":seat_no
    })

    send_mail(
        "[Django-Movies]:Thank you for purchasing a ticket",
        render_msg,
        settings.EMAIL_HOST_USER,
        [email,]
    )