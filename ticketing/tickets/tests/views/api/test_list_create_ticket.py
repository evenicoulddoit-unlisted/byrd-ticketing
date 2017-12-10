from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from django.urls import reverse

from tickets import models as tickets_models


class ListCreateTicketViewTests(APITestCase):
    """
    Integration tests for the list/create API view.
    """
    url = 'api:tickets:list'

    def setUp(self):
        self.client = APIClient()

    def test_smoke_returns_200(self):
        """
        Test that the endpoint returns a 200 OK response.
        """
        response = self.client.get(reverse(self.url))
        self.assertEqual(status.HTTP_200_OK, response.status_code)

    def test_lists_tickets(self):
        """
        Test that the tickets are retrieved and represented as JSON.
        """
        ticket_1 = tickets_models.Ticket(
            requester_name='John Smith',
            requester_email='j.smith@foo.com',
            subject='Lorem Ipsum',
            message='Important problem',
            type=tickets_models.Ticket.TYPE_BUG_REPORT,
            urgency=tickets_models.Ticket.URGENCY_HIGH,
            status=tickets_models.Ticket.STATUS_OPEN
        )
        ticket_2 = tickets_models.Ticket(
            requester_name='Buzz Lightyear',
            requester_email='2infinity@beyond.com',
            subject='Query',
            message='I want to go space',
            type=tickets_models.Ticket.TYPE_OTHER,
            urgency=tickets_models.Ticket.URGENCY_LOW,
            status=tickets_models.Ticket.STATUS_REJECTED
        )
        tickets_models.Ticket.objects.bulk_create([ticket_1, ticket_2])
        response = self.client.get(reverse(self.url))
        self.assertEqual(status.HTTP_200_OK, response.status_code)

        data = response.data
        self.assertIsInstance(data, list)
        self.assertEqual(2, len(data))
        self.assertEqual(
            [ticket_2.pk, ticket_1.pk],
            [t['id'] for t in data]
        )

    def test_invalid_post_400_response(self):
        """
        Test that POST requests create a new ticket.
        """
        data = dict(
            requester_name='John Smith',
            requester_email='j.smith@foo.com',
            subject='Lorem Ipsum',
            message='Important message',
            type=tickets_models.Ticket.TYPE_BUG_REPORT,
            status=tickets_models.Ticket.STATUS_OPEN,

            # Model validation should recognise this as an invalid urgency
            urgency=9,
        )

        response = self.client.post(reverse(self.url), data)
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)
        self.assertFalse(tickets_models.Ticket.objects.exists())

    def test_valid_post_creates_new_ticket(self):
        """
        Test that POST requests create a new ticket.
        """
        data = dict(
            requester_name='John Smith',
            requester_email='j.smith@foo.com',
            subject='Lorem Ipsum',
            message='Important message',
            type=tickets_models.Ticket.TYPE_BUG_REPORT,
            urgency=tickets_models.Ticket.URGENCY_HIGH,
            status=tickets_models.Ticket.STATUS_OPEN
        )

        response = self.client.post(reverse(self.url), data)
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertEqual(1, tickets_models.Ticket.objects.count())

        ticket = tickets_models.Ticket.objects.get()

        for key, value in data.items():
            self.assertEqual(value, getattr(ticket, key))
