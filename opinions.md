---
layout: page
title: Opinions
header_img: header_opinion.jpg

list_category: opinions
---

<section class="articles">
   {% for post in site.categories.opinions %}
      {% if post.url %}
         <a class="article_card {{post.article_class}}" href="{{ post.url }}">
            <header style="background-image:url(
               {% if post.teaser_img %}
                  '/images/posts/{{ post.folder }}/{{ post.teaser_img }}'
               {% elsif post.header_img %}
                  '/images/posts/{{ post.folder }}/{{ post.header_img }}'
               {% else %}
                  '/images/posts/{{ post.folder }}/header.jpg'
               {% endif %}
            )">
               <h3>{{ post.title }}</h3>
            </header>
            <time datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | date: "%B %Y" }}</time>
            <p>{{ post.excerpt | strip_html | newlines_to_br }}</p>
         </a>
      {% endif %}
   {% endfor %}    
</section>