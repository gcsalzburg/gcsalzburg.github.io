---
layout: post
folder: Light-Engineering
title: Light Engineering
strapline: Exploring light pipes in consumer electronics

published: false

categories: [tech]
tags: light-pipes mechanical engineering
---

Recently I've been exploring some of the engineering behind the manipulation of light. In consumer electronics it is common (for cost or manufacturing reasons) to mount an LED status light some distance from the outlet location in the housing. This distance can be bridged with a light pipe.

<!-- more -->

The picture below is a budget wireless charger, clearly identified by the giant **WIRELESS CHARGER** print on the front. I'll be using this example to illustrate some of the basic ideas surrounding light pipe engineering.

![The wireless charger](/images/posts/Light-Engineering/wireless_charger.jpg)

## Theory first

Total internal reflection is the key to light pipe operation. Snell's Law and Fresnel Loss can be used to explain the basic phenomenon of light pipe operation.

### Snell's Law

When a light ray passes between mediums of differing refractive indexes, the light ray is bent. You may recall a school experiment involving a block of perspex and a light beam which demonstrated how this occured. Snell's law defines the size of this bend. Typically values of `n` in air (`n=1`) or acrylic (`n=1.5`) are listed [on Wikipedia](https://en.wikipedia.org/wiki/List_of_refractive_indices).

![Snell's Law](/images/posts/Light-Engineering/equation1.png)

The critical angle defines the minimum angle for which light will totally internally reflect. It applies when moving from a higher refractive index material to a lower one. Assuming the lower density material is air (`n=1`), then the angle is:

![Critical angle](/images/posts/Light-Engineering/equation3.png)

The simulation below shows collimated light entering a light pipe, bending towards the normal as it does, and then totally internally reflecting until exiting the opposite end.

[picture!]

### Fresnel loss

This defines the energy loss in the ray due to refraction at a boundary. Too many refractions and the ray will lose a lot of its energy. A typical plastic-air interface might have a Fresnel loss of around 4-5%.

![Fresnel loss](/images/posts/Light-Engineering/equation2.png)


## Light pipe principles

Looking inside the wireless charger, we see four main parts:

1. Lower housing
2. Upper housing
3. PCB mounted at rear with charging coil, power circuit and micro USB port
4. Clear plastic light pipe

![The wireless charger](/images/posts/Light-Engineering/cover_removed.jpg)

Optimising light pipe design requires keeping light in 

### Keeping light inside

+ Smooth surfaces keep light in, rough surfaces let light out. 
+ Tighter coupling of the LED into the light pipe will capture a higher percentage of the light output.
+ 

### Letting light out



## Assessing light pipe quality

Firstly, this light pipe is terribly inefficient:

![Inefficient light pipe](/images/posts/Light-Engineering/light_pipe_turned_on.jpg)

The fundamental job of a light pipe is to keep light _inside_ the pipe. Not only is this whole pipe illuminated, but the source LED is illuminating large parts of the interior housing. A typical light pipe test involves visually assessing the pipe in a darkened room; the photo was shot outdoors!

![LED on from outside](/images/posts/Light-Engineering/led_on_outside.jpg)

But is this a problem? The status light is clearly visible from the exterior.
