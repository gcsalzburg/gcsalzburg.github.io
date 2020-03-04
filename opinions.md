---
layout: page
title: Opinions
header_img: header_tedx.jpg
---

<section class="projects">
   {% for post in site.categories.opinions %}
      {% if post.url %}
         <article class="project_card">
            <div class="project_card_img">
               <img src="/images/posts/{{ post.folder }}/header.jpg">
            </div>
            <h3>{{ post.short-title }}</h3>
            <p>{{ post.strapline }}</p>
         </article>
      {% endif %}
   {% endfor %}    
</section>