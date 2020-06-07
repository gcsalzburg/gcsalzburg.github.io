---
layout: post
folder: Microsoft_Teams
title: Microsoft Teams video effects
strapline: Adding crazy video effects to your Microsoft Teams calls

header_img: header-2.gif
article_class: no_filter
og_image: header-1.gif

categories: [tech]
tags: teams conference-call working-from-home 
---

This week, offices across Europe and North America had their first taste of remote working thanks to COVID-19. For many, this meant learning to use Microsoft Teams, which saw almost [40% more traffic this week than last](https://www.theverge.com/2020/3/19/21186452/microsoft-teams-new-features-noise-supression-user-increase-coronavirus).

I wanted to experiment with making the video chat in Teams a bit more...fun. Zoom, the big rival to Teams, already lets you [select virtual backgrounds](https://support.zoom.us/hc/en-us/articles/210707503-Virtual-Background). But the method here goes much, much further and it's suprisingly easy to do.

I'll show you how!

![Screen capture of the Microsoft Teams start chat view with the Distort effect](join-chat-demo.gif)

<!-- more -->

## Virtual Webcams ##

Computers can have more than one webcam. For instance, many laptops come with a front and rear camera by default.

The technique we'll use is to give your computer another webcam: a Virtual Webcam. Your computer believes this is just another camera you've plugged in, but actually it is a special video feed you've created. The video feed consists of the image from your normal webcam, plus a filter effect.

> Virtual Webcam = Normal Webcam + Filter effect

We'll use a simple Webcam software called [Webcamoid](https://webcamoid.github.io/) to do this.

## How to add a Virtual Webcam feed to Teams ##

1. Install Webcamoid: https://webcamoid.github.io/

   On Windows or Mac, select the option under `Installable` and `64bits`. Open up the program.

   ![Webcamoid software installed](installed.jpg)

2. From the menu at the bottom, select the `Preferences` option.

   ![Selecting preferences from the bottom menu](preferences.jpg)

3. On the top left menu, you'll see the `Output` tab is already selected. So on the right, click `Add` and give your new Virtual Camera a name you'll recognise. And click `Ok`. You might get a popup from Windows asking if you're ok making changes to your PC. Obviously, say yes.

   You should close and re-open Webcamoid at this point. Not sure why, just seemed to help the Virtual Camera show up.

   ![Adding a virtual camera](add-virtual-camera.jpg)

4. To get the camera to show up in Teams, you'll want to restart it. Use the taskbar icon to select `Quit`, then re-launch Teams.

   ![Quit Teams from the Taskbar](quit-teams.jpg)

5. To select your Virtual Webcam in Teams, right-click on your face in the top right corner and select `Settings`.

   ![Opening Settings in Teams](teams-settings.jpg)

   Then under the `Devices` menu at the bottom, you can change your `Camera` in the dropdown menu to your new Virtual Camera.

   ![Selecting the Virtual Camera in Teams](devices-camera.jpg)

6. If it works, you'll see a video feed of either your existing webcam, or if Webcamoid is not open then it will be an inverted image of the Webcamoid logo (as shown below). The easiest way to test the video feed in Teams is to select `Calendar` and then `Meet Now`, which opens a new video call immediately. Success! 

   ![Webcamoid Default Screen](webcam-working.jpg)

## Playing with the filters ##

Just setting your Virtual Camera to the same feed as your normal camera is fairly pointless. The reason Webcamoid is so great is that it comes with a long list of ridiculous effects to play with. 

Back in the Webcamoid program, the `Filters` tab lets you select a filter. Distort and Psychadelic were particularly fun. Filters apply to the video feed selected in the `Source` tab and are rendered instantly - you can switch between effects mid-call with ease!

![Selecting a filter in Webcamoid](filters-panel.jpg)

![Animation of the effect applied in Teams](effect-join1.gif)

### Hints and Tips ###

+ The framerate and resolution of the Virtual Webcam can be quite bad in the Teams output. I haven't yet found a way to increase the Virtual Camera resolution, but the framerate problem can easily be solved by reducing the resolution of the source image in the `Source` tab in Webcamoid.

+ To combine multiple effects, in the `Preferences > General Options` section there is an option to `Enable Advanced Effects Mode`.

+ If at any time something stops working, rebooting Webcamoid seems to work well!

## I want more ##

If you've mastered the basics of using Virtual Cameras in conference calls, you can level up by using [OBS Studio](https://obsproject.com/) in combination with the [OBS Virtual Camera Plugin](https://obsproject.com/forum/resources/obs-virtualcam.539/). It doesn't come with so many effects built in, but is a much more powerful option for playing tricks like feeding a pre-recorded video of you working into the Teams call, whilst you nap on the sofa.

Have fun!