# API URL routes

from django.urls import path
from . import views

urlpatterns = [
    path('messages/send/', views.send_message, name='send_message'),
    path('messages/receive/<str:mailbox_id>/', views.receive_messages, name='receive_messages'),
    path('mailbox/create/', views.create_mailbox, name='create_mailbox'),
    path('cleanup/', views.cleanup_expired, name='cleanup_expired'),
]
