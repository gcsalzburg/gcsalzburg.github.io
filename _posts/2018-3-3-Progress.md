---
layout: post
title: Progress
strapline: Faking an intelligent feedback bar 
---

## Progress indicators when you can't measure progress ##

A couple of years a go I was developing a Chrome plugin for tagging and saving collections of web pages. My friend working on some UI concepts proposed a two step transformation of the Save button:

* The button is replaced by a progress bar while the save request is handled by the back-end
* After the request is handled, the button turns to a circle which flood-fills the whole pane.

_(this was 2015, and flood fills were the height of fashion)_

Here's a gif which shows what's going on quite clearly:

![Flood fill effect on progress bar](/images/posts/Progress/initial_idea.gif)

![Estimation from XKCD](https://imgs.xkcd.com/comics/estimation.png)

The progress indication was the big challenge. We were both keen to provide some [positive feedback](https://www.smashingmagazine.com/2012/07/are-giving-users-positive-feedback/) that the request was being handled, but the animation concept didn't lend itself to a continuous looping sequence. Plus I felt we could do better than to simply.

## Calculating progress times ##

When the Save button was clicked, the following steps occurred:

1. POST request was sent to the server with the data to be saved
2. The server-side script would request and download the selected image from a remote server (or, occasionally, receive and build an image of the page screenshot from the a base64 string in the POST data
3. The SQL database would be updated
4. The result of the script execution was returned to the client

Steps 1, 3 and 4 took an unknown length of time, but the time varied little between subsequent runs. Step 2 could take a very long time (indeed in one test case my colleague Tony actually exceeded the available memory for the script when he selected a 7000 x 3000 pixel image which was 1.1MB compressed as a jpeg, but noticeably larger when inflated with imagecreatefromjpeg() ).

Since our simple architecture provided no means to measure the progress of the script execution on the server, we decided to fake it.

## Pretending to measure ##

My rationale was:

1. Execution times vary between 0s and 10s, but with a distribution strongly skewed towards the shorter times
2. The maximum time we ever experienced was around 10s (for Tony's image)<
3. ...

Thus the progress bar was built twice, as the HTML fragment below shows.

```html
<a href="#save" class="save_button" id="save_button">
  <span class="save_text">Save</span>
  <span class="progress_bar"></span>
  <span class="progress_bar_complete"></span>
</a>
```

The `prograss_bar` class uses a custom [cubic-bezier curve](http://cubic-bezier.com/?#.08,1,.43,1) for the fill. If used alone, it would start to fill the bar quickly before slowing to almost a crawl, finally reaching the end after 10 seconds:

```css
.progress_bar{
	transition-property: 		width;
	transition-duration: 		10s;
	transition-timing-function: cubic-bezier(0.08,1,0.43,1);
	transition-delay: 			0.3s;
}
```
Behind this sits a second bar: `.progress_bar_complete`. This animation is triggered once a successful response is received back from the server. It is a fast, linear fill which takes about 0.4s to complete.

## Feedback loop ##

We initially deployed this system on a local intranet, where network latency was in effect 0, and the scripts would run blazing fast.

When I later ported the app to work over the web,