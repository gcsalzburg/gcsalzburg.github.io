---
layout: post
folder: Manufacturing
title: Better DFMA, with a telephone

categories: [tech]
tags: dfma dfm manufacturing assembly servicing repair telephones engineering

excerpt: Last week I bought a wonderful old rotary dial telephone from a flea market in Germany. The original intent was to gut the insides and refit it for a more digital future, however the internal design is such a masterclass in design for repair, servicing and documentation that I haven't yet had the heart to butcher it. 

---

DFMA stands for Design for Manufacturing and Assembly. In a traditional model of engineering development, DFMA is the act of converting concepts and prototype designs into finished designs suitable for mass-manufacture. An understanding of manufacturing processes is critical, to ensure the process is appropriate for the desired production volumes, cost target and quality.

Over time I've become especially wary of conversations which begin "we need to apply DFMA to x". Everyone understands that ideation and product development must always consider materials and manufacturing processes from the very beginning. Yet to treat DFMA as a discrete stage on a development pipeline can easily result in a dangerous mindset and approach to design that believes problems can be solved "further down the line".

This is a subject for a future discussion however.

![Opened telephone](/images/posts/Manufacturing/outside.jpg)

## Design for repair and serving ##

Last week I bought a wonderful old rotary dial telephone from a flea market in Germany. The original intent was to gut the insides and refit it for a more digital future, however the internal design is such a masterclass in design for repair, servicing and documentation that I haven't yet had the heart to butcher it. 

The DFMA acronym focuses the engineering mind on just the manufacturing and initial-assembly portions of the design. Under the cover, this telephone superbly illustrates five additional, important points that are often lost in the rush to optimise designs for high volume, automated processes: 

1. [Design for disassembly](#1-design-for-disassembly)
2. [Design for repair](#2-design-for-repair)
3. [Design for (re-)assembly](#3-design-for-re-assembly)
4. [Self-documenting designs](#4-self-documenting-designs)
5. [Accessible documentation](#5-accessible-documentation)

### 1. Design for disassembly ###

No matter how difficult you try to make it, somebody will one day [dismantle your product](http://www.nightscout.info/). Unless there is a clear safety case (children's toys, hazardous voltage etc..) you may as well make this a pleasant experience for them.

The telephone has a single flat-head screw, with a wide uniform slot which means any flat sided object can be used to open it - no need for a screwdriver let alone a bespoke tool. The use of a captive screw here is genius too, slightly higher cost but it will never be lost. Note the turned end to aid alignment during [re-assembly](#5-design-for-re-assembly).

![Single flathead screw for access](/images/posts/Manufacturing/access.jpg)

![Captive screw](/images/posts/Manufacturing/screw.jpg)

### 2. Design for repair ###

Open a typical car engine today and the components under the bonnet lie flush to top. Servicing and repairs on vehicles is more even more complicated by the fact that the access to fixings for so many parts are obscured behind others. Even this doesn't stop people, especially if you [product is a Tesla](https://www.youtube.com/watch?v=NuAMczraBIM).

This telephone uses a common screw size, with all the mounting points fixed in a common plane. The product doesn't need to be re-orientated or inverted in order to open and inspect it in the first place and the sealant dap of Loctite on the screws also serves a useful dual function as tamper-evidence.

![Hand drawn schematic](/images/posts/Manufacturing/insides.jpg)

### 3. Design for (re-)assembly ###

Aggressive snap-fits, ultrasonic welding and heat staked plastic casings are just a few examples of one-time assembly techniques commonly used in automated assembly lines. I don't have a strong argument against the obvious economic benefits of these techniques.   

![Hand drawn schematic](/images/posts/Manufacturing/open.jpg)

### 4. Self-documenting designs ###

In programming we talk about [self-documenting code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882), where the use of sensible naming schemes and clear program logic can negate the need for [endless comments and documentation](http://thedailywtf.com/articles/CodeThatDocumentsItselfSoWellItDoesNotNeedComments). I believe the same philosophy can easily be applied to physical products; the wiring colour conventions of black for GND and red for VCC+ are perhaps the most common example of a self-documenting design.

These wiring looms might not have much colour variety in the cabling, but they are retained on elegant support trusses. The logic and connections between components is easy to see at a glance, with no hidden return paths or meshes of wiring.

![Beautiful internal wiring looms](/images/posts/Manufacturing/wiring.jpg)

### 5. Accessible documentation ###

Projects such as [iFixit](https://www.ifixit.com/) collate [community sourced wikis](https://www.youtube.com/watch?v=dMwLUnd_ydI) for all manner of repair tasks on consumer electronics, typically where no manual or supplier information exists. On a component level, services like [AllDataSheet](https://www.alldatasheet.com/) and [Octopart](https://octopart.com/) fill the void. But what's one better than shipping your product with a [technical support manual](https://archive.org/details/computermanuals)? A printed schematic to aid fault finding included inside the casework! Bonus points for being hand drawn.

![Hand drawn schematic](/images/posts/Manufacturing/label.jpg)

## What now?

I was very pleased to learn recently that much of this advice is also captured in the [Maker's Bill of Rights](https://cdn.makezine.com/make/MAKERS_RIGHTS.pdf) published by MAKE in 2005. 

We can learn so much from the masters of old.

![Maker's Bill of Rights](/images/posts/Manufacturing/makers-rights.jpg)