from django.urls import path

from tickets.views import api as ticket_views_api


app_name = 'tickets'

urlpatterns = [
    path('', ticket_views_api.ListCreateTicket.as_view(), name='list'),
    path(
        '<int:id>/', ticket_views_api.RetrieveTicket.as_view(), name='retrieve'
    )
]
