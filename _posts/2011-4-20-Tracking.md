---
layout: post
title: Tracking
strapline: Deciphering the hidden iPhone CellLocation data
tags: iphone
---

As widely reported in the [news](http://www.bbc.co.uk/news/technology-13145562) during April 2011, iPhones store and save to a backup file timestamp/location data for the phone whilst it is in operation. Inspired by the description provided by [Pete Warden](http://petewarden.github.com/iPhoneTracker/), I conducted my own investigation to plot the information onto Google Maps.

## How it works ##

![Example output](/images/posts/Tracking/map_demo.png)

This project was put together using information sourced online as follows:

1. Locate the **Manifest.mbdb** file in the iPhone backup on the PC. This is located in the Roaming folder in the AppData section for Windows Vista. There are several different folders with random file names in here, just select the folder with the most recently modified files in it.

2. Run this script through a Python file downloaded from [Stack Overflow](http://stackoverflow.com/questions/3085153/how-to-parse-the-manifest-mbdb-file-in-an-ios-4-0-itunes-backup). The script dumped data to the command window which was too long to read, so I had it print the contents to a textfile and do a search for the phrase **consolidated.db**. It reads the file as a binary textfile, if you open the file in Notepad++ (or other) it won't read correctly.

3. This phrase you searched for sits on a line looking something like this:
`-rw-r--r-- 00000000 00000000 28082176 1297319654 1297319654 1282888290 (4096c9ec676f2847dc283405900e284a7c815836) RootDomain::Library/Caches/locationd/consolidated.db`
The number in brackets indicates the filename (no file extension) of the file in the folder you found **Manifest.mbdb** in that has the cellphone location data.

4. This file is an **SQLite DB**. Upload it to a server and use [PHP and PDO](http://henryranch.net/software/ease-into-sqlite-3-with-php-and-pdo/) (you can't use the SQLite functions included with PHP 5+ since the file is SQLLite v3 not v2) to connect to it.

5. The table of cellphone trianglulation data is called CellLocation (note I used SQLite Manager in Firefox to browse the file to help write the SQL queries in PHP). The first columns of the table are as follows:
  * **rowid** - Unique row identifier
  * **MCC** - Mobile Country Code (UK is 234)
  * **MNC** - Mobile Network Code (30: T-Mobile, 33:Orange, 20: 3 Network etc...) Full table of codes found on [George Zhu's blog](http://george.insideiphone.com/wp-content/uploads/2007/12/mcc-and-mnc-codes.pdf)
  * **LAC** - Location Area Code
  * **CI** - Cell identifier. Details on these two located [here](http://designfest.acm.org/Problems/CellKeeper/CellKeeper_96.htm) and on [Wikipedia](http://en.wikipedia.org/wiki/Mobility_management).

6. After these comes the information we need:
  * **Timestamp** - Seconds calculated from 1st January 2001 (00:00:00), which is 978307200 as a UNIX timestamp (for reference, to help scale them correctly later)
  * **Latitude**
  * **Longitude**
  * **HorizontalAccuracy** - Measured in metres, some information to clarify this on [Stack Overflow](http://stackoverflow.com/questions/3672763/typical-time-and-horizontalaccuracy-of-iphone-cllocation-in-practice).

7. Finally, there are a few columns of information that seemed to be un-populated or not very useful on the data I extracted:
  * **Altitude** - always 0
  * **VerticalAccuracy** - always -1
  * **Speed** - always -1
  * **Course** - always -1
  * **Confidence** - seems to take a set value either 50,60,65,68, or 70

## What do you do with this? ##

Firstly, strip out any unwanted rows, where Lat/Long = 0, HorizontalAccuracy = -1, CI = -1 etc... Then, to start with observe that multiple rows have the same timestamp so for simplicity run an SQL search as follows:

``` sql
SELECT Timestamp,Latitude,Longitude,HorizontalAccuracy FROM CellLocation WHERE (CI >= 0) AND (HorizontalAccuracy >= 0) GROUP BY Timestamp ORDER BY HorizontalAccuracy ASC LIMIT 500
```

This can be plotted on Google Maps, using circles with a radius to show the accuracy. What you do with the data from now on is up to you!

## Future ideas to implement ##

* Check if HorziontalAccuracy is the radius/diameter of the circles (circles might be out by a factor of 2 either way).
* Triangulate information from multiple cell identifiers (CIs) for the same timestamp to locate the position more accurately (the Google Maps plot shows that it often gets it wrong).
* Re-write the Python script into PHP or something I understand properly.
