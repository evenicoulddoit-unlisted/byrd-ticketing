from rest_framework.generics import (
    ListCreateAPIView, RetrieveUpdateDestroyAPIView
)
from rest_framework import permissions

from tickets import (
    models as tickets_models, serializers as tickets_serializers
)


class TicketAPIViewMixin:
    queryset = tickets_models.Ticket.objects.all().order_by('-pk')
    serializer_class = tickets_serializers.TicketSerializer


class ListCreateTicket(TicketAPIViewMixin, ListCreateAPIView):
    """
    List view to retrieve all tickets and create new ones.
    """


class RetrieveTicket(TicketAPIViewMixin, RetrieveUpdateDestroyAPIView):
    """
    Retrieve view to get / update / delete individual ticket instances.
    """
    permission_classes = (permissions.IsAuthenticated,)
