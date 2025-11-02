from django.db import models
from django.contrib.auth.models import User

class Sweet(models.Model):
    """
    Represents a sweet item in the store.
    Each sweet has a name, category, price, quantity, and the admin who added it.
    """
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=0)
    added_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.category})"

    def purchase(self, amount=1):
        """
        Decrease sweet quantity by the given amount (used in purchase_sweet endpoint).
        """
        if self.quantity >= amount:
            self.quantity -= amount
            self.save()

    def restock(self, amount=1):
        """
        Increase sweet quantity by the given amount (used in restock_sweet endpoint).
        """
        self.quantity += amount
        self.save()
