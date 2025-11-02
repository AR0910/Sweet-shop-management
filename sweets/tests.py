from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from sweets.models import Sweet

class AuthTests(APITestCase):
    def test_register_user(self):
        """Test user registration endpoint"""
        url = reverse('register')
        data = {'username': 'newuser', 'password': 'newpass123'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login_user(self):
        """Test login endpoint returns JWT token"""
        User.objects.create_user(username='test', password='test123')
        url = reverse('token_obtain_pair')
        data = {'username': 'test', 'password': 'test123'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)


class SweetTests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser(username='admin', password='admin123')
        self.user = User.objects.create_user(username='user', password='user123')

        login_res = self.client.post(reverse('token_obtain_pair'),
                                     {'username': 'admin', 'password': 'admin123'})
        self.admin_token = login_res.data['access']

    def test_add_sweet_requires_auth(self):
        """Anonymous users should not be able to add sweets"""
        url = reverse('sweet_list_create')
        res = self.client.post(url, {'name': 'Ladoo', 'category': 'Traditional', 'price': 50, 'quantity': 10})
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_admin_can_add_sweet(self):
        """Admin users can add sweets"""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.admin_token}')
        url = reverse('sweet_list_create')
        res = self.client.post(url, {'name': 'Barfi', 'category': 'Milk', 'price': 80, 'quantity': 20})
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Sweet.objects.count(), 1)

    def test_purchase_decreases_quantity(self):
        """Purchasing should reduce stock quantity"""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.admin_token}')
        sweet = Sweet.objects.create(
            name='Gulab Jamun',
            category='Syrup',
            price=100,
            quantity=5,
            added_by=self.admin  # ✅ Fix here
        )
        url = reverse('sweet_purchase', args=[sweet.id])
        res = self.client.post(url)
        sweet.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(sweet.quantity, 4)
