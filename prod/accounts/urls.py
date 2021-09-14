from django.urls import path
from .views import *

urlpatterns = [
    path('signup', Signupview.as_view()),
    path('oauth', OAuth.as_view()),
]
