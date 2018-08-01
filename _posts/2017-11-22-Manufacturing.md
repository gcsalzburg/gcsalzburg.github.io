---
layout: post
title: Manufacturing
strapline: Learning DFMA from a rotary dial telephone 
tags: dfma dfm manufacturing assembly servicing repair telephones engineering
---

## DFMA ##

DFMA stands for Design for Manufacturing and Assembly. In a traditional model of engineering development, DFMA is the act of converting concepts and prototype designs into finished designs suitable for mass-manufacture by whatever processes is most appropriate for the desired production volume.

Over time I've become especially wary of conversations which begin "we need to apply DFMA to x". It is well acknowledged that ideation and product development must always consider materials and manufacturing processes from the very beginning. Yet to treat DFMA as a discrete stage on a development pipeline can easily result in a dangerous mindset and approach to design that believes problems can be solved "further down the line".

This is a subject for a future discussion however.

Last week I bought this wonderful old rotary dial telephone from a flea market in Germany. The original intent was to gut the insides and refit it for a more digital future, however the internal design is such a masterclass in design for repair and servicing that I haven't yet had the heart to butcher it.

![Opened telephone](/images/posts/Manufacturing/outside.jpg)

## Design for repair and serving ##

Under the cover, this telephone superbly illustrates five important points that are often lost in the rush to optimise designs for high volume, automated manufacturing processes: 

1. [Easy to dismantle](#1-easy-to-dismantle)
2. [Self-documenting design](#2-self-documenting-design)
3. [Clear documentation](#3-clear-documentation)
4. [Design for repair](#4-design-for-repair)
5. [Design for (re-)assembly](#5-design-for-re-assembly)

### 1. Easy to dismantle ###

The telephone has a single flat-head screw, with a wide uniform slot which means any flat sided object can be used to open it - no need for a screwdriver let alone a bespoke tool. The use of a captive screw here is genius too, slightly higher cost but it will never be lost. Note the turned end to aid alignment during [re-assembly](#5-design-for-re-assembly).

![Single flathead screw for access](/images/posts/Manufacturing/access.jpg)

![Captive screw](/images/posts/Manufacturing/screw.jpg)

### 2. Self-documenting design ###

In programming we talk about [self-documenting](http://thedailywtf.com/articles/CodeThatDocumentsItselfSoWellItDoesNotNeedComments) [code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882), where the use of sensible naming schemes and clear program logic can negate the need for endless comments and documentation. The same philosophy could easily be applied to physical products; the wiring colour conventions of black for GND and red for VCC+ are perhaps the most common example of a self-documenting design.

These wiring looms might not have much colour variety in the cabling, but they are retained on elegant support trusses. The logic and connections between components is easy to see at a glance.

![Beautiful internal wiring looms](/images/posts/Manufacturing/wiring.jpg)

### 3. Clear documentation ###

Wikis such as xxx aim to gather together documentation for products. What's one better than shipping your product with a technical support manual? A printed schematic to aid fault finding included inside the casework!

![Hand drawn schematic](/images/posts/Manufacturing/label.jpg)

### 4. Design for repair ###

Open a typical car engine today and the components under the bonnet lie flush to top. Servicing and repairs on vehicles is more even more complicated by the fact that the access to fixings for so many parts are obscured behind others.

This telephone mounts everything in a single plane, with screw terminals. The product doesn't need to be re-orientated or inverted in order to open and inspect it in the first place and the sealant dap of Loctite on the screws also serves a useful dual function as tamper-evidence.

(mini cooper could have engine stripped with only one hex key?)

![Hand drawn schematic](/images/posts/Manufacturing/insides.jpg)

### 5. Design for (re-)assembly ###

Factory design for re-assembly vs. 

![Hand drawn schematic](/images/posts/Manufacturing/open.jpg)

## What now?

I was very pleased to see that much of this advice is also captured in the [Maker's Bill of Rights](https://cdn.makezine.com/make/MAKERS_RIGHTS.pdf) published by MAKE in 2005. 

We can learn so much from the masters of old.

(image of maker's bill of rights)