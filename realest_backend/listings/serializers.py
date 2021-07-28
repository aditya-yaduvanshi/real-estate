from rest_framework import serializers
from .models import Listing, Picture

class PictureSerializer(serializers.ModelSerializer):
  class Meta:
    model = Picture
    fields = ('id','picture')


class ListingSerializer(serializers.ModelSerializer):
  class Meta:
    model = Listing
    fields = ('title', 'address', 'city', 'state', 'price', 'sale_type', 'home_type', 'bedrooms', 'bathrooms', 'sqft', 'main_photo', 'slug', 'list_date')


class ListingDetailSerializer(serializers.ModelSerializer):
  photos = PictureSerializer(many=True)
  class Meta:
    model = Listing
    fields = '__all__'
    lookup_field = 'slug'

