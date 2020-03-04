---
layout: post
folder: Orientation
title: Orientation
strapline: AHRS, calibration and quaternions

categories: [tech]
tags: orientation electronics ahrs imu mems sensing arduino quaternions
---

Recently I've been experimenting a lot with understanding orientation data. Processing and interpreting device orientation seems to be one of the few areas where the Arduino platform of sensors doesn't quite abstract away all of the technical challenge. 

The primary output from any one of the many 9DOF (degree of freedom) boards available is a set of measurement points for acceleration, magnetic field and gyroscopic rotation. It is not immediately obvious why combining these is not a trivial exercise.

<!-- more -->

![Various 9DOF sensors](/images/posts/Orientation/dof_sensors.jpg)

## Basic data capture ##

At the heart of the problem is that absolute position in space requires a combination of four sensors: accelerometer, magnetometer, gyroscope and altimeter. A system which provides the raw data from these is commonly referred to as an IMU (Inertial Measurement System). Combining these results in an AHRS (Altitude and Heading Reference System). For my purposes I omit the "A", since I wish to calculate the relative orientation of a product with respect to a reference point.

I started off using analog MEMS accelerometers such as the [ADXL335](https://www.sparkfun.com/datasheets/Components/SMD/adxl335.pdf) but quickly progressed to the very impressive [NXP Precision breakout](https://www.adafruit.com/product/3463) from Adafruit for the FXOS8700 and FXAS21002. This board has level-shifting for a 5V interface and an I2C interface, which is everything I need.

Reading the orientation data is trivial and Adafruit provide a nice sensor abstraction layer which is definitely worth using:

```c++
#include <Adafruit_Sensor.h>
#include <Adafruit_FXAS21002C.h>
#include <Adafruit_FXOS8700.h>

Adafruit_FXAS21002C gyro = Adafruit_FXAS21002C(0x0021002C);
Adafruit_FXOS8700 accelmag = Adafruit_FXOS8700(0x8700A, 0x8700B);

void init_sensors(){
    accelmag.begin(ACCEL_RANGE_4G);
    gyro.begin();
}

void read_sensors(){
    // Create a new sensor event
    sensors_event_t gyro_event;
    sensors_event_t accel_event;
    sensors_event_t mag_event;

    // Get new data samples
    gyro.getEvent(&gyro_event);
    accelmag.getEvent(&accel_event, &mag_event); 
}
```

## Converting to orientation ##

I've learned three basic lessons when working with orientation data:

1. Use the best AHRS algorithm you can afford on the processor
2. Remember to calibrate the sensor first!
3. Always work in quaternions, converting to Euler angles only for presentation output

### AHRS ###

To convert the data into Euler angles for orientation (i.e. roll, pitch and yaw) an AHRS algorithm is needed. There are three options that I generally use:

1. Adafruit_Simple_AHRS.h
2. Mahony
3. Madgwick

The first is a basic fusion of the data but will suffer from gimbal lock and offers no quaternion output. So Mahony or Madgwick are needed. Amazingly these algorithms are very new, [Sebastian Madgwick](http://x-io.co.uk/open-source-imu-and-ahrs-algorithms/) at the University of Bristol only developed the AHRS algorithm he gives his name to in 2009. It builds on the work of Robert Mahony, presented [only a year earlier](https://ieeexplore.ieee.org/document/4608934/).

The [Adafruit Github](https://github.com/adafruit/Adafruit_AHRS) has C++ implementations of all of them. Mahony is slightly less intensive, so I use it on 8bit systems like the AVR ATmega32U4. On a SAMD21 Cortex M0 there's plenty of space to spare, so I normally go for Madgwick. Even though Mahony is considered "lightweight", it still uses up 20% of the PROGMEM just to implement the filter function, so take care!

#### Mahony ####

Implementation was quite straightforward:

```c++
#include <Mahony.h>

Mahony filter;

void init_sensors(){
    ...
    filter.begin(10);
}

void read_sensors(){
    ...
    // Update the filter
    filter.update(gx, gy, gz, ax, ay, az, mx, my, mz);
}
```

It's important to set the rate correctly in the `filter.begin()` call. The fusion algorithms are sensitive to timing and so the `begin()` parameter should correlate to the sample rate (e.g. 10 = 10 samples per second). This is easy to measure in the Serial window, but I've yet to find a reliable way to tune this figure to get the stability I would like.

#### Madgwick ####

On the M0 this is my preferred approach. Implementation was again very simple, in fact both of these AHRS implementations are designed to be swappable with no code changes.

```c++
#include <Madgwick.h>

Madgwick filter;

void init_sensors(){
    ...
    filter.begin(60);
    filter.setBeta(1.2f);
}

void read_sensors(){
    ...
    // Update the filter
    filter.update(gx, gy, gz, ax, ay, az, mx, my, mz);
}
```

In this case, I modified the `Madgwick.h` file to enable the setting of the beta value at runtime. Without this, I found it very hard to tune the `filter.begin()` call to get the values to converge correctly, the response time was very slow and also full of overshoots. Big thanks to [this forum post](https://forums.adafruit.com/viewtopic.php?f=19&t=126734&p=632174&hilit=nxp#p632174) for the advice.

```c
// Implementation of setBeta() in <Madgwick.h>
public:
    Madgwick(void);
    void begin(float sampleFrequency) { invSampleFreq = 1.0f / sampleFrequency; }

    void setBeta( float newBeta ) { beta = newBeta; }
```

### Calibration ###

Calibration is used to account for errors in the magnetometer output. I use the [MotionCal tool](https://www.pjrc.com/store/prop_shield.html) from PJRC and suggest you do the same. 

![Various 9DOF sensors](/images/posts/Orientation/motioncal.png)

Upload the test sketch to the board and then wave it around for a while until the red dots look nice and round. The sensor reading function then becomes a little larger as shown below: 

```c++
// Mag calibration values from via ahrs_calibration.
float mag_offsets[3]            = { -63.74F, -105.74F, 54.82F };
float mag_softiron_matrix[3][3] = { {  1.023,  0.023,  0.007 },
                                    {  0.023,  0.984,  0.012 },
                                    {  0.007,  0.012,  0.993 } };
float mag_field_strength        = 42.47F;

void read_sensors(){
    // Create a new sensor event
    sensors_event_t gyro_event;
    sensors_event_t accel_event;
    sensors_event_t mag_event;

    // Get new data samples
    gyro.getEvent(&gyro_event);
    accelmag.getEvent(&accel_event, &mag_event);

    // Apply mag offset, mag soft iron error comp and gyro zero-rate error comp
    float x = mag_event.magnetic.x - mag_offsets[0];
    float y = mag_event.magnetic.y - mag_offsets[1];
    float z = mag_event.magnetic.z - mag_offsets[2];
    float mx = x * mag_softiron_matrix[0][0] + y * mag_softiron_matrix[0][1] + z * mag_softiron_matrix[0][2];
    float my = x * mag_softiron_matrix[1][0] + y * mag_softiron_matrix[1][1] + z * mag_softiron_matrix[1][2];
    float mz = x * mag_softiron_matrix[2][0] + y * mag_softiron_matrix[2][1] + z * mag_softiron_matrix[2][2];

    // Convet gyro data to degrees/s for filter library
    float gx = gyro_event.gyro.x * 57.2958F;
    float gy = gyro_event.gyro.y * 57.2958F;
    float gz = gyro_event.gyro.z * 57.2958F;
}
```

Of course, this calibration will differ on a sensor by sensor basis. I've yet to implement a clever way of using the same code across multiple boards but with different calibration data.

### Quaternions ###

Euler angles are not uniquely mapped to orientations, which means that just knowing the angles doesn't tell you with any certainty what the orientation of the sensor is. The maths for quaternion manipulation is etched into the stone of [Broom Bridge](https://en.wikipedia.org/wiki/Broom_Bridge) in Dublin, but fortunately it is also implemented in various IMU libraries.

I use a small set of libraries for vector, quaternion and matrix manipulation which I adapted from the Embedded Tool Kit by [Samuel Cowen](http://www.camelsoftware.com/). However, I recently found an almost identical implementation from Adafruit in [their repo for the BNO055 sensor](https://github.com/adafruit/Adafruit_BNO055/tree/master/utility) (see [Future options](#future-options) below for a discussion on this sensor).

The video below shows a test of the orientation code running on a 32u4 development board. The button saves the quaternion for the board at the moment it is pressed, and the lights then display the roll/pitch away from that position. I can use this to detects if an object has toppled over. 

<video controls muted src="/images/posts/Orientation/orientation-test.mp4" width="100%">
    Sorry, your browser doesn't support embedded videos.
</video>

The basic code to implement this is summarised below:

```c++
#include <IMU.h>

imu::Quaternion Quat_Home = imu::Quaternion(0.0,0.0,0.0,0.0);

void save_home_quat(){
    float qw, qx, qy, qz;
    filter.getQuaternion(&qw, &qx, &qy, &qz);
    Quat_Home = imu::Quaternion(qw, qx, qy, qz);
}

uint8_t get_tilt(){
    float qw, qx, qy, qz;
    filter.getQuaternion(&qw, &qx, &qy, &qz);

    // Create new Quaternions object
    imu::Quaternion Current(qw, qx, qy, qz);     

    // Check against home position
    // Do a reverse transformation from the home state to current position
    imu::Quaternion Qdiff = Current*Quat_Home.conjugate();
    imu::Vector<3> Vdiff = Qdiff.to_euler();
    Vdiff.to_degrees();

    return max(abs(Vdiff.y()), abs(Vdiff.z()));    
}
```

The board in the demo video above also implements a save to the EEPROM of the home position, which is a nice feature to persist the home state during power cycles.

## Future options ##

Ideally, I wouldn't have to worry about any of this and could just poll the MEMS sensor over I2C/SPI for the orientation directly. Just recently, one interesting product has come out onto the market from Bosch which will do this all for you. It's called the BNO055 - a product code just asking for typo trouble. BNO055 is a MEMS accelerometer, magnetometer and gyroscope on a single die, plus an ARM Cortex-M0 processor which will convert the sensor data directly to orientation vectors/quaternions. You can [buy this on a breakout from Adafruit](https://www.adafruit.com/product/2472) and it looks perfectly for abstracting away the complexities (and memory expense) of processing the data. It is also quite expensive.