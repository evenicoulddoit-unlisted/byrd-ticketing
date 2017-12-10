from rest_framework import serializers

from tickets import models as tickets_models


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = tickets_models.Ticket
        fields = '__all__'
