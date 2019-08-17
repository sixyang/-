from django import template
from django.utils.safestring import mark_safe


register = template.Library()

@register.simple_tag
def get_num(news):
    num = news.favour.all().count()
    return num
