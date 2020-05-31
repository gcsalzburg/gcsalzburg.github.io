---
layout: post
folder: Light-Engineering
title: Light Engineering
strapline: Exploring light pipes in consumer electronics

published: false

categories: [tech]
tags: light-pipes mechanical engineering
---

This week I've been exploring some of the engineering behind the manipulation of light. In consumer electronics it is common (for cost or manufacturing reasons) to mount an LED status light some distance from the outlet location in the housing. This distance can be bridged with a light pipe.

<!-- more -->

The product below is a budget wireless charger, clearly identified by the hideous **WIRELESS CHARGER** print on the front. I'll be using this example to illustrate some of the basic ideas surrounding light pipe engineering.

![The wireless charger](/images/posts/Light-Engineering/charger-parts.jpg)

## Theory first

Total internal reflection is the key to light pipe operation. Snell's Law and Fresnel Loss can be used to explain the basic phenomenon of light pipe operation.

### Snell's Law

When a light ray passes between mediums of differing refractive indexes, the light ray is bent. You may recall a school experiment involving a block of perspex and a light beam which demonstrated how this occured. Snell's law defines the size of this bend. Typically values of `n` in air (`n=1`) or acrylic (`n=1.5`) are listed [on Wikipedia](https://en.wikipedia.org/wiki/List_of_refractive_indices).

![Snell's Law](/images/posts/Light-Engineering/equation1.png)

The RayViz simulation below shows collimated light entering a light pipe, bending towards the normal as it does. It then totally internally reflects until exiting at the opposite end, bending away from the normal.

![Total internal reflection simulation](/images/posts/Light-Engineering/tir-1.png)

The critical angle defines the minimum angle for which light will totally internally reflect. It applies when moving from a higher refractive index material to a lower one. Assuming the lower density material is air (`n=1`), then the angle is:

![Critical angle](/images/posts/Light-Engineering/equation3.png)

Updating the model to include a slight taper on the light pipe shows how the TIR angle increases until on the 7th collision it is smaller than the critical angle, and the light escapes.

![Critical angle simulation](/images/posts/Light-Engineering/tir-3.png)

### Fresnel loss

This defines the energy loss in the ray due to refraction at a boundary. Too many refractions and the ray will lose a lot of its energy. A typical plastic-air interface might have a Fresnel loss of around 4-5%.

![Fresnel loss](/images/posts/Light-Engineering/equation2.png)


## Light pipe principles

Looking inside the wireless charger, we see four main parts:

1. Upper housing (removed in picture below)
2. Lower housing
3. PCB mounted at rear with charging coil, power circuit and micro USB port
4. Clear plastic light pipe

![Inside the wireless charger](/images/posts/Light-Engineering/cover_removed.jpg)

Optimising light pipe design requires keeping light inside, minimising and losses during this transmission, and then allowing it to leave where needed. Typically the light at the exit should be as diffused as possible.

### Keeping light inside

Three basic design principles:

1. Smooth surfaces keep light in, rough surfaces let light out. 
1. Bend radii should be large and smooth, to avoid breaking the TIR.
1. Tight coupling of the LED into the light pipe helps to capture a higher percentage of the light output.

Light pipes need a high reflectance at the light pipe boundaries. All surfaces will have some level of roughness, so the more polished the mold tool is, the better (e.g. [SPI-A1 or A2](https://www.protolabs.com/resources/design-tips/sorting-through-surface-finishes/)). Note that adding reflective paint will keep the light in, but also introduce significant losses, especially on a long pipe. Let the TIR do the work for you!

One counter-intuitive point is that a polished exit surface can lead to TIR where the light oscillates back and forth between the entrance and exit surfaces.

### Letting light out

To break the TIR, a rough surface will introduce microscopic surface deviations which scatter the light. As a demonstration, adding a [Mold-Tech texture](https://upmold.com/mold-tech-texture-specifications/) (e.g. MT-11070) to the exit surface scatters the light: 

![Scattering light at exit with Mold-Tech texture](/images/posts/Light-Engineering/tir-2.png)

There are plenty of other ways to mix up the light inside the pipe more thoroughly. One option is the use of bulk scattering fillers, for instance those from [Sabic](https://www.sabic.com). 

## Assessing light pipe quality

Back to our wireless charger. Firstly, this light pipe is terribly inefficient. The fundamental job of a light pipe is to keep light _inside_ the pipe. Not only is this whole pipe illuminated, but the source LED is illuminating large parts of the interior housing. A typical light pipe test involves visually assessing the pipe in a darkened room; the photo below was shot outdoors!

But exactly how inefficient is it?

![Inefficient light pipe](/images/posts/Light-Engineering/light_pipe_turned_on.jpg)

Using a reverse engineered model in SolidWorks, its easy to see that due to the offset location of the side LED, only a fraction of the light will ever enter the pipe in the first place. 

![Rays from LED](/images/posts/Light-Engineering/led-rays-source.png)

Running a basic TracePro model will produce an illuminance map for the small output surface. Even with this quick check, its clear to see that the Flux/Emitted Flux is 0.0032063, i.e. only 0.32% of the light that leaves the LED actually arrives at the output.  

![TracePro analysis](/images/posts/Light-Engineering/trace-pro2.png)
![Illuminance Map](/images/posts/Light-Engineering/trace-pro3.png)

### Two LEDs

The analysis above shows something else, which is that some of the rays actually bounce around and travel back towards the second LED on the other "prong" of the pipe.

The wireless charger can indicate two different states: blue light for charging and green light for ready. At first I assumed that each prong was for a different LED colour, but actually both inputs are a bi-colour blue/green LED.

Curious to see why, I ran a simulation using a separate wavelength LED colour (`xxx` and `xxx`) on each prong. The True Color Map shows clearly that the dominate colour for each half comes from the opposite prong, an effect also visible in the Illuminance Map above.

![True Color image](/images/posts/Light-Engineering/trace-pro4.png)

## Further reading

For more information on the engineering side of light pipe design, here are some good links to explore:

+ [Fictiv.com](https://www.fictiv.com/hwg/design/learn-by-example-how-to-design-light-pipes) - Basic teardown of a few different light pipe solutions

   