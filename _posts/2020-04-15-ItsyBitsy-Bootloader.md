---
layout: post
folder: 2020-04-ItsyBitsy-Bootloader
title: Burning ItsyBitsy 32u4 Bootloader
strapline: A library of common parts for electronics prototyping

published: true

categories: [tech]
tags: electronics arduino
---

I bought 22x Adafruit ItsyBitsy 32u4 5v boards this week. Two of them didn't identify when plugged in, instead registering as an error in Device Manager (I had a `libusb-win32 devices` device called `ATm32U4DFU`).

I thought maybe the bootloader was the issue. Here's how to burn it using an Arduino Uno as an intermediary.

<!-- more -->

## How to burn the bootloader

### Equipment

+ Arduino Uno
+ Arduino IDE
+ [WinAVR](https://sourceforge.net/projects/winavr/) installed
+ Adafruit ItsyBitsy 32u4 5v
+ Male->Female jumper cables

### How to burn

1. Upload the `Arduino as ISP` sketch from the `Examples > ArduinoISP` folder in the IDE.

2. Wire Arduino Uno to the ItsyBitsy as follows:

   ```bash
   Arduino -> ItsyBitsy
   5V      -> 5V
   GND     -> GND
   10      -> RST
   11      -> MOSI
   12      -> MISO
   13      -> SCK
   ```

3. Download the [Caterina bootloader](https://learn.adafruit.com/introducting-itsy-bitsy-32u4/downloads) for ItsyBitsy 32u4 5v from Adafruit website

4. On the command line, set the fuses for programming with:

   ```bash
   avrdude -c avrisp -P COM9 -b 19200 -p m32u4 -U lfuse:r:low_fuse_val.hex:h -U hfuse:r:high_fuse_val.hex:h
   ```

5. Then burn the bootloader!

   ```bash
   avrdude -c avrisp -P COM9  -b 19200 -p m32u4 -U flash:w:Caterina_itsybitsy5V.hex
   ```

In theory, its also [possible to use the Arduino IDE to do this](https://coytar.wordpress.com/2013/04/27/use-arduino-uno-as-an-avr-isp-to-burn-the-bootloader-to-a-sparkfun-pro-micro-5v/), but I didn't have much success (it worked once, then gave me repeated errors).

![Adafruit ItsyBitsy 32u4 plugged into the Uno](plugged_to_uno.jpg)