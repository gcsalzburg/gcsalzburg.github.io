---
layout: page
title: Tech
header_img: header_wii.jpg
---

<section class="article_list">
   {% for cat in site.categories %}
      {% if cat[0] == "tech" %}
         {% for post in cat[1] %}
            {% if post.url %}
               <a class="article_card {{post.article_class}}" href="{{ post.url }}">
                  <time datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | date: "%Y / %m" }}</time>
                  <div>
                     <h3>{{ post.title }}</h3>
                     <div class="tags">
                        {% for tag in post.tags %}
                           <span>{{ tag }}</span>
                        {% endfor %}  
                     </div>
                  </div>
               </a>
            {% endif %}
         {% endfor %}  
      {% endif %}
   {% endfor %}    
</section>