---
layout: post
title: "A look at the OS X 10.7 Beta"
date: "2016-05-16 23:08:35 -0500"
---
Today, I received a copy of the later 10.7 Beta, build 11A390. The date on the install CD is 2011, and for those who do not know, Lion was officially released July of 2011.


![Lion 2011 Beta](http://images.128keaton.com/2016/05/Slack for iOS Upload.jpg)

Quickly, I pulled out my trusty 2009 Black MacBook to do a test install. I did, however, try anyway on my MacBookPro1,1, just in case we had a 32-bit EFI bootloader. On initial glance at the DVD, which init of itself is quite amazing, since Lion was never sold on one. Only digital download or on a $20 USB stick (which I own too), there wasn't any welcome documentation, nor was there the Lion install icon, but something more generic instead.

Just X

![Install Disc](http://images.128keaton.com/2016/05/Screen Shot 2016-05-16 at 4.27.18 PM.png)

## Installation

Anyway, onto installing. I booted into the installer, and was greeted by the modern 'OS X Utilities', but had stylings stuck between Snow Leopard and Lion.

![Mac OS X Utilities](http://images.128keaton.com/2016/05/IMG_1819.JPG)

Another weird thing inside of Disk Utility:

![UISegmentedControl](http://images.128keaton.com/2016/05/IMG_1821.JPG)

The segment control was nothing like I've seen before.

Anyway, post installation time, time for setup. We did get the lovely welcome video from Leopard, which was refreshing, even after hearing it a billion times.

First, the background wasn't the sterile gray, we had a nice picture of Mt. Fiji:

![Mt Feejee](http://images.128keaton.com/2016/05/IMG_1825.JPG)

I personally think it looks far better, I never noticed how nice that pic looks.

Then, it gave me the option to add encrypt my disk, something not implemented until 10.10. I wonder why they didn't do it when they had the option to.

![Yosemite? Anyone?](http://images.128keaton.com/2016/05/IMG_1827.JPG)

I opted not to, just in case some odd bug arose, which prevented me from exploring the rest of the operating system.

![Without the crap scrolling](http://images.128keaton.com/2016/05/IMG_1828.JPG)

## Desktop

![The desktop](http://images.128keaton.com/2016/05/Screen Shot 2016-05-16 at 10.01.10 PM.png)

Here we are at the desktop of 10.7, beta! Take note of the Launchpad icon.
Quite ugly, glad it was changed.

I went to About My Mac->More Info, just to see the build number, and was greeted by this:

![](http://images.128keaton.com/2016/05/Screen Shot 2016-05-16 at 10.01.55 PM.png)

Some weird mutant view. I do kinda like it though, not the icons.

![](http://images.128keaton.com/2016/05/Screen Shot 2016-05-16 at 10.02.02 PM.png)

The battery view is very nice, I could definitely see this making a come back, maybe with an overall battery health meter, a la CoconutBattery?

![TM](http://images.128keaton.com/2016/05/Screen Shot 2016-05-16 at 10.05.52 PM.png)

Time Machine also had a few surprises, it had the option to store hourly snapshots locally, and daily backups on a Time Machine drive/server. Once again, if properly working, I'd love that to make a reappearance.



![Software updates](http://images.128keaton.com/2016/05/Screen Shot 2016-05-16 at 10.07.23 PM.png)

Oh, I should probably update that :)

That about wraps it up. I did upload all of my pics for your viewing pleasure, check them out below:


<div class="gallery">
{% loopdir path:"gallery/lion-beta" match:"*.md" sort:"ordering" %}
    <a href="/{{ item.fullname }}.html">
        <img alt="Photo: {{ item.title }}" height="96" src="/{{ item.fullname }}~96x96.jpg" title="{{ item.title }}" width="96" />
    </a>
{% endloopdir %}
