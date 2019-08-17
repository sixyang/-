from django.contrib import admin
from main.models import MyUser, News

# Register your models here.

@admin.register(News)
class MyAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'news_id', 'pic_url',  'url', 'news_type_id',
                    'user_id')


