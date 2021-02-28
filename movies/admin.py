from django.contrib import admin
from .models import Movie, Payment, PaymentIntent,Seat

# Register your models here.
admin.site.register(Movie)
admin.site.register(Seat)
admin.site.register(Payment)
admin.site.register(PaymentIntent)