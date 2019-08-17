"""chouti URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from main.views import main_views, context, zone

from chouti import settings
from django.views.static import serve

urlpatterns = [
    path('', main_views.index),
    path('admin/', admin.site.urls),
    # re_path('^/?$', main_views.index),
    re_path('index', main_views.index),

    re_path('signin', main_views.signin),
    re_path('login', main_views.login),
    re_path('logout', main_views.logout),

    re_path('my_zone/?$', zone.my_zone),
    re_path('my_zone/my_release', zone.my_release),
    re_path('my_zone/my_like', zone.my_like),

    re_path('like', context.like),
    re_path('upload', main_views.upload),
    re_path('release', context.release),
    re_path('get_title', context.get_title),

    re_path('zone', include('main.urls')),
    # re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT})
#
]
