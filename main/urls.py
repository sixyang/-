from django.urls import path, re_path, include
from main.views import main_views, context, zone

urlpatterns = [
    re_path('news|scoff|pic|tec|ask', zone.news),
]