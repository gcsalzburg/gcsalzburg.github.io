---
layout: post
folder: Components
title: Standard Components
strapline: A library of common parts for electronics prototyping

published: false

categories: [tech]
tags: electronics prototyping arduino raspberry-pi
---

Gap between "kits" and high volume parts from Mouser.

## Microprocessors

Three choices:

+ 32u4 Board -> 5v/16Hz
+ Teensy 3.x
+ ESP8266/32, ideally in Feather format


| SparkFun Pro Micro | Teensy 3.5/6 | Feather Huzzah |
|---|---|---|
|  32u4 | ARM | z |

Switching is easy using `PlatformIO` plugin for `VSCode`.



+ with built in USB so not only does it have a USB-to-Serial program & debug capability built in with no need for an FTDI-like chip, it can also act like a mouse, keyboard, USB MIDI device, etc
+ Easy to snap off microUSB socket, Teensy ones are better attached!

> **TODO:** Try out Adafruit ItsyBitsy 32u4, looks cheaper and slightly smaller (at the expense) of some pins not accessible on a breadboard.

## Power

Everything runs at 5V. So power supplies for this are good.

## Discrete Components

### Switches

+ Round push ones
+ Nobbly ones of different heights
+ 

## Other stuff

Wire etc...

https://www.amazon.de/dp/B01EV70C78/ref=psdc_1626220031_t1_B014KTSMLA

### 