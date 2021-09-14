from django.contrib import admin
from .models import *

class ListingAdmin(admin.ModelAdmin):
  list_display = ('id', 'title', 'is_published', 'price', 'list_date', 'realtor')
  list_display_links = ('id', 'title')
  list_filter = ['realtor']
  list_editable = ['is_published']
  search_fields = ('title', 'description', 'address', 'city', 'state', 'zipcode', 'price')
  list_per_page = 25

class PictureAdmin(admin.ModelAdmin):
  list_display = ('id', 'listing', 'picture')
  list_display_links = ('id', 'listing')
  list_filter = ['listing', 'picture']
  list_editable = ['picture']
  search_fields = ('listing', 'picture')


admin.site.register(Picture, PictureAdmin)
admin.site.register(Listing, ListingAdmin)