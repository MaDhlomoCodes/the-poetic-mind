from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from .models import Poem

User = get_user_model()

class PoemTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.force_authenticate(user=self.user)

    def test_create_poem(self):
        response = self.client.post('/api/poems/', {
            'title': 'Test Poem',
            'body': 'This is a test poem.'
        })
        self.assertEqual(response.status_code, 201)
    def test_list_poems(self):
        Poem.objects.create(title='Sample', body='Body', author=self.user)
        response = self.client.get('/api/poems/')
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.data), 1)
    def test_unauthenticated_access(self):
        self.client.logout()
        response = self.client.get('/api/poems/')
        self.assertEqual(response.status_code, 401)
