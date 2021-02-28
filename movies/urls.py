from django.urls import path

from .views import index, makePayement,occupiedSeats, paymentConfirm, webhook

app_name='movies'

urlpatterns = [
    path('',index,name="home"),
    path('occupied/',occupiedSeats,name="occupied_seat"),
    path('payment/',makePayement,name="payment"),
    path("webhook/",webhook,name="webook"),
    path("payment-confirm/",paymentConfirm,name="payment-confirm")
]
