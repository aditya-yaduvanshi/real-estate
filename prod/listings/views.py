from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import *
from .serializers import *
from datetime import datetime, timezone
from django.db.models import Count
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
class ListingsView(ListAPIView):
  queryset = Listing.objects.order_by('-list_date').filter(is_published=True)
  permission_classes = (permissions.AllowAny,)
  serializer_class = ListingSerializer
  lookup_field = 'slug'

class ListingDetailView(RetrieveAPIView):
  queryset = Listing.objects.order_by('-list_date').filter(is_published=True)
  serializer_class = ListingDetailSerializer
  lookup_field = 'slug'

class SearchView(APIView):
  permission_classes = (permissions.AllowAny,)
  serializer_class = ListingSerializer

  @csrf_exempt
  def post(self, request, format=None):
    queryset = Listing.objects.order_by('-list_date').filter(is_published=True)
    data = self.request.data 
    sale_type = data['sale_type']
    queryset = queryset.filter(sale_type__iexact=sale_type)

    price = data['price']
    if price != 'Any':
      queryset = queryset.filter(price__gte=price)
    
    bedrooms = data['bedrooms']
    if bedrooms != 'Any':
      queryset = queryset.filter(bedrooms__gte=bedrooms)

    home_type = data['home_type']
    queryset = queryset.filter(home_type__iexact=home_type)

    bathrooms = data['bathrooms']
    if bathrooms != 'Any':
      queryset = queryset.filter(bathrooms__gte=bathrooms)

    sqft = data['sqft']
    if sqft != 'Any':
      queryset = queryset.filter(sqft__gte=sqft)
    
    days_passed = data['days_listed']
    if days_passed != 'Any':
      for query in queryset:
        num_days = (datetime.now(timezone.utc) - query.list_date).days

        if days_passed != 0:
          if num_days > int(days_passed):
            slug = query.slug
            queryset = queryset.exclude(slug__iexact=slug)

    has_photos = data['has_photos']
    if has_photos != 'Any':
      count = 0
      for query in queryset:
        if query.main_photo:
          count += 1
        if query.photos:
          count = count + query.photos.all().count()
        if count < has_photos:
          slug = query.slug
          queryset = queryset.exclude(slug__iexact=slug)
    
    open_house = data['open_house']
    queryset = queryset.filter(open_house__iexact=open_house)

    keywords = data['keywords']
    queryset = queryset.filter(description__icontains=keywords)

    serializer = ListingSerializer(queryset, many=True)

    return Response(serializer.data)
