---
layout: post
title: Training
strapline: Teaching programming to non-engineers
published: false
---

Material requirements

Lesson 1
Each person needs:

	- 1x Breadboard, Arduino Uno
	- 1x LED
	- 1x 330R resistor
	- ~8x wires
	- 1x potentiometer
	- Printout of circuit to make x2
	
Lesson 2 requirements:

Same as lesson 1, plus:

	- 1x Breadboard, Arduino Uno
	- 3x LEDs
	- 3x 330R resistor
	- ~12 wires
	- 3x push buttons
	- 3x 10K resistors
	- Printout of circuit to make x2

Lesson 3 requirements:

Same as above, plus:

	- 1x Adafruit NeoPixel strip

What to learn

Lesson	Project	Learning		
		General	Software	Electronics
1	Control LED brightness from a potentiometer	Basic summary	setup(), loop()	LEDs, resistors
		How to use Arduino IDE	pinMode(), digitalWrite(), analogRead(), analogWrite()	5v/0v Powerlines
		What is Arduino and breadboard	Serial monitor
		Serial monitor as debug tool	Variables - for pin number etc
		One program, runs once on power up forever
2	Reaction game	Planning a circuit	Conditional statements - if/else{}	Pull-down resistors
		Setting up the program	Creating a custom function	Push buttons
		Building it up bit-by-bit from a flow diagram	millis()	
3	Neopixel patterns	Using libraries and more complex components	Importing a library	NeoPixels
			Creating a variable
			Loops - for()

Lesson 1 - Lesson plan

#	Topic	Notes
1	Intro	Ask for backgrounds, previous experience
		Explain principle of the course, no stupid questions
		Check software was installed ok
2	Arduino	Give them an Arduino. What is Arduino (company vs. product)?
		Explain: chip, pins on the sides, other components. 
		Principles: upload code, run once, saved, cannot be recovered backwards
		Plug it in, explain different LEDs (x4)
3	First program	Open IDE
		Buttons at top
		Setup vs. loop.
		Comments // 
		Void, bracket types, syntax, take care with every character!
		pinMode(), digitalWrite(), delay()
		Make LED flash
4	First circuit	Make circuit on breadboard
		Variables, change code to use variables
		Basic model of voltage and current - pipe of water (height=V, diameter=A)
5	Serial	How to debug
		Serial monitor, Serial.begin(), what is a library of code (why Serial. ?)
		
6	Extras	Use of potentiometer
		analogRead(), analogWrite()
		Variable changing with dial
		Serial monitor to print flash speed or flash on/off

Lesson 2 - Lesson plan

#	Topic	Notes
1	Intro	Recap of last week
		Plan for this week - planning circuit, setting up program, building up program bit by bit
		How to design a circuit - draw a plan for the program. Decision loops etc
		
2	Make circuit	Explain more about resistors
		Explain about floating inputs and how switches work
		
3	Progamming	random()
		If/ else
		Custom functions
4	Improving code	Score output - millis()
		Custom functions
		Serial output
5	Extras	Prevent cheating!
		Add a third button

Lesson 3 - Lesson plan

#	Topic	Notes
1	Intro	Recap of last weeks
		Plan for this week - how to buy something and set it up to run c
		
2	Buying a part	Intro Adafruit - neopixels, component
		Uberguide
		
3	Setup	Shortest time to getting it running.
		Installing a library
		Show examples - e.g. Blink
		Load strandtest example
		Change PIN and number of pixels
		Compile and run
4	Understanding code	Copy past "simple" example code
		Delete bits we don't need
		Explain for loops and test
5	Develop code	Make a custom colourwipe() function with r,g,b parameters
		Make function to fade between two colour values
		        
		
		
6	Extras	Add potentiometer to set brightness
