from django.shortcuts import HttpResponse, render, redirect
from django.http import JsonResponse
from main import models
from django.contrib.auth.models import User
# from main.views import main_views
import json

def like(request):
    #TODO 这个函数需要修改
    # print("like函数执行！")
    if request.user.is_authenticated:
        if request.method == 'POST':
            web_article_id = request.POST.get('id', None)
            is_remove = request.POST.get('remove', None)

            #TODO id的验证功能
            cur_news = models.News.objects.get(news_id=web_article_id)  #获得当前新闻对象
            favour_user_object = cur_news.favour.all()          #这里获得了喜欢这个新闻的所有用户对象，代码提示是显示不出来的
            cur_user = User.objects.get(username=request.user)  #获得当前用户对象

            if is_remove:
                cur_user.user_favour.remove(cur_news)
                return HttpResponse('del_ok')

            if cur_user in favour_user_object:
                return HttpResponse('exist')
            else:
                cur_user.user_favour.add(cur_news)              #添加新闻对象，这里用的是反查
                return HttpResponse('ok')
    else:
        return HttpResponse("fail")

def release(request):
    if request.is_ajax():
        text = request.POST.get('text', None)
        zone = request.POST.get('zone', None)
        pic = request.FILES.get('pic', None)
        url = request.POST.get('url', None)
        print(text, zone, pic, url)

        #TODO: 这里加上一段验证函数。
        if text:
            news_id = str(abs(hash(text)))[:8]
            release_user = User.objects.get(username=request.user)
            pic_path = 'statics/picture/'+pic.name
            if pic:
                with open(pic_path, 'wb') as file:
                    for i in pic.chunks():
                        file.write(i)

            news_type1 = models.NewsType.objects.get(news_type_name=zone)
            models.News.objects.create(news_id=news_id, summary=text, news_type=news_type1,
                                       user=release_user, pic_url='/'+pic_path, url=url)
            return HttpResponse(json.dumps('ok'), content_type='application/json')
        else:
            return HttpResponse(json.dumps('no'), content_type='application/json')

def get_title(request):
    if request.is_ajax():
        url = request.POST.get('url', None)
        import requests
        from bs4 import BeautifulSoup
        try:
            ret = requests.get(url)
            ret.encoding = 'utf-8'
            soup = BeautifulSoup(ret.text, features='html.parser')
        except Exception:
            return HttpResponse('no')
        else:
            return HttpResponse(soup.title.text)

