from django.db import models
from django.utils.timezone import now
from realtors.models import Realtor
# Create your models here.


class Picture(models.Model):
  picture = models.ImageField(upload_to='photos/%y/%m/%d', blank=True)
  listing = models.ForeignKey('Listing', on_delete=models.CASCADE, related_name='listing')
  slug = models.CharField(max_length=200)

  def __str__(self):
    return f"id: {self.id}, slug: {self.slug}"


class Listing(models.Model):
  class SaleType(models.TextChoices):
    FOR_SALE = 'For Sale'
    FOR_RENT = 'For Rent'
  
  class HomeType(models.TextChoices):
    HOUSE = 'House'
    CONDO = 'Condo'
    TOWNHOUSE = 'Townhouse'

  realtor = models.ForeignKey(Realtor, on_delete=models.DO_NOTHING)
  slug = models.CharField(max_length=200, unique=True)
  title = models.CharField(max_length=100)
  address = models.CharField(max_length=150)
  city = models.CharField(max_length=100)
  state = models.CharField(max_length=100)
  zipcode = models.CharField(max_length=15)
  description = models.TextField(blank=True)
  sale_type = models.CharField(max_length=20, choices=SaleType.choices, default=SaleType.FOR_SALE)
  price = models.FloatField()
  bedrooms = models.IntegerField()
  bathrooms = models.DecimalField(max_digits=2, decimal_places=1)
  home_type = models.CharField(max_length=50, choices=HomeType.choices, default=HomeType.HOUSE)
  sqft = models.FloatField()
  open_house = models.BooleanField(default=False)
  main_photo = models.ImageField(upload_to='photos/%y/%m/%d', blank=True)
  photos = models.ManyToManyField(Picture, related_name='photo', blank=True)
  is_published = models.BooleanField(default=True)
  list_date = models.DateTimeField(default=now, blank=True)

  def __str__(self):
    return f"id: {self.id}, title: {self.title}"

