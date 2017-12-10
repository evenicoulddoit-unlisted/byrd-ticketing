from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from django.contrib.auth import models as auth_models
from django.urls import reverse

from tickets import models as tickets_models


class RetrieveTicketViewTests(APITestCase):
    """
    Integration tests for the retrieve tickets API view.
    """
    url = 'api:tickets:retrieve'

    def setUp(self):
        self.client = APIClient()
        self.ticket = tickets_models.Ticket.objects.create(
            requester_name='John Smith',
            requester_email='j.smith@foo.com',
            subject='Lorem Ipsum',
            message='Important problem',
            type=tickets_models.Ticket.TYPE_BUG_REPORT,
            urgency=tickets_models.Ticket.URGENCY_HIGH,
            status=tickets_models.Ticket.STATUS_OPEN
        )
        self.ticket_url = reverse(self.url, kwargs=dict(pk=self.ticket.pk))
        self.user = auth_models.User.objects.create_user(
            'staff', 'staff@getbyrd.com'
        )

    def test_403_when_not_logged_in(self):
        """
        Test that the endpoint returns a 200 OK response.
        """
        response = self.client.get(self.ticket_url)
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    def test_404_when_ticket_not_found(self):
        """
        Test that the endpoint returns a 200 OK response.
        """
        url = reverse(self.url, kwargs=dict(pk=999))
        self.client.force_login(self.user)
        response = self.client.get(url)
        self.assertEqual(status.HTTP_404_NOT_FOUND, response.status_code)

    def test_logged_in_user_retrieve(self):
        """
        Test that a logged in user is returned the serialized Ticket.
        """
        self.client.force_login(self.user)
        response = self.client.get(self.ticket_url)
        self.assertEqual(status.HTTP_200_OK, response.status_code)

        data = response.data
        self.assertIsInstance(data, dict)

        for key, value in data.items():
            self.assertEqual(value, getattr(self.ticket, key))

    def test_logged_in_user_patch(self):
        """
        Test that a logged in user is able to PATCH the ticket.
        """
        self.client.force_login(self.user)
        response = self.client.patch(
            self.ticket_url,
            dict(status=tickets_models.Ticket.STATUS_COMPLETED)
        )
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.ticket.refresh_from_db()
        self.assertEqual(
            tickets_models.Ticket.STATUS_COMPLETED, self.ticket.status
        )

    def test_logged_in_user_delete(self):
        """
        Test that a logged in user is able to DELETE the ticket.
        """
        self.client.force_login(self.user)
        response = self.client.delete(self.ticket_url)
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)
        self.assertFalse(tickets_models.Ticket.objects.exists())
