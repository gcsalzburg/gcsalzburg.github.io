---
layout: post
title: Orientation
strapline: AHRS, fusion and running out of memory
---

The Arduino platform of sensors provides incredible versatility when it comes to communicating with sensors. In particular, much of the challenge of interfacing and processing data from an external input (e.g. light, temperature, touch) is typically packaged up inside user friendly libraries and code samples. 

Often, orientation detection seems like the exception to this. The primary output from any one of the many 9DOF (degree of freedom) boards available is a set of measurement points for acceleration, magentic field and gyroscopic rotation. It is not immediately obvious why combining these is not a trivial exercise.

## Data capture and fusion algorithms ##

At the heart of the problem is that absolute position in space requires a combination of four sensors: accelerometer, magentometer, gyroscope and altimeter. A system which provides the raw data from these is commonly referred to as an IMU (Inertial Measurement System) Combing these is referred to as AHRS (Altitude and Heading Reference System). Typically I omit the "A", since I wish to calculate the relative orientation of a product with respect to a reference point.

There is one interesting product on the market from Bosch which will do this all for you. It's called the BNO055 - a product code just asking for typo trouble. BNO055 is a MEMS accelerometer, magnetometer and gyroscope on a single die, plus an ARM Cortex-M0 processor which will convert the sensor data directly to orientation vectors/quaternions. You can [buy this on a breakout from Adafruit](https://www.adafruit.com/product/2472) and it looks perfectly for abstracting away the complexities (and memory expense) of processing the data.

In the mean time, I've been using various 9DOF boards to 

To do this, I first capture the data from 

### Why did my model just flip upside down? ###

<video controls muted src="/images/posts/Orientation/orientation-test.mp4" width="600">
    Sorry, your browser doesn't support embedded videos.
</video>