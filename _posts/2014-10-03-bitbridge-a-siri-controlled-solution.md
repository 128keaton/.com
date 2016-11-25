---
layout: post
status: publish
published: true
title: BitBridge, a Siri-controlled Solution!
date: '2014-10-03 09:41:34 -0500'
---
Here at BitTank, we write a lot of apps that never see the light of day, mostly because they aren't suitable for the end user and requires changing code manually.
Recently, I decided to make a lamp that is controlled by Siri, easy right? Slap SiriProxy on a Raspberry Pi and be done with it. Wrong. SiriServer doesn't work with iOS 7, much less iOS 8. 
I knew it could be done somehow. I looked at Googolplex (bad idea), but I eventually came to HomeKit, a new Apple API that allows you to control household stuff with Siri. 
Perfect application of API, my lamp. Now, on GitHub, I have for OS X, BitBridge, an application that makes your Mac appear like a HomeKit bridge on the network and advertises sample services, the only one that actually works is the Light. 
The Light opens up a serial port to my Arduino and sends commands. The bridge receives commands from the HomeKit API. In order for this to work, you need to use a client app on your iPhone, also on the BitTank Github as 'BitBridge-iOS'. Check them out today!

<p class="exerpt-base">Most of this is outdated, alot of the Node.JS solutions work MUCH better</p>

