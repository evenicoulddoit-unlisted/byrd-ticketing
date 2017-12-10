from django.conf import settings
from django.db import models


class Ticket(models.Model):
    """
    Model to store ticket information.
    """
    TYPE_BUG_REPORT = 'b'
    TYPE_FEATURE_REQUEST = 'f'
    TYPE_OTHER = 'o'
    TYPE_CHOICES = (
        (TYPE_BUG_REPORT, 'Bug Report'),
        (TYPE_FEATURE_REQUEST, 'Feature Request'),
        (TYPE_OTHER, 'Other'),
    )

    URGENCY_LOW = 1
    URGENCY_MEDIUM = 2
    URGENCY_HIGH = 3
    URGENCY_CHOICES = (
        (URGENCY_LOW, 'Low'),
        (URGENCY_MEDIUM, 'Medium'),
        (URGENCY_HIGH, 'High'),
    )

    STATUS_OPEN = 'o'
    STATUS_IN_PROGRESS = 'p'
    STATUS_COMPLETED = 'c'
    STATUS_REJECTED = 'r'
    STATUS_CHOICES = (
        (STATUS_OPEN, 'Open'),
        (STATUS_IN_PROGRESS, 'In Progress'),
        (STATUS_COMPLETED, 'Complete'),
        (STATUS_REJECTED, 'Rejected'),
    )

    requester_name = models.CharField(max_length=64)
    requester_email = models.EmailField(max_length=128)
    subject = models.CharField(max_length=128)
    type = models.CharField(max_length=1, choices=TYPE_CHOICES)
    urgency = models.IntegerField(choices=URGENCY_CHOICES)
    message = models.TextField()
    status = models.CharField(
        max_length=1, choices=STATUS_CHOICES, default=STATUS_OPEN
    )


class TicketComment(models.Model):
    """
    Model to store comments against a ticket.
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT
    )
    comment = models.TextField()
