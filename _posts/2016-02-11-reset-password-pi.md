---
layout: post
title: "Resetting the Password on a Raspberry Pi"
date: 2016-02-11 09:31:21 -0600

---
Today I was working on a project I had been recruited to do about three weeks ago. I was given a Raspberry Pi preloaded with the project, but I couldn’t remember the password they’d set.

Using Google-fu, I have compiled the complete tutorial to resetting the password on the `pi` user.

First, unplug the pi and grab the SD card.

Plug it into your machine (if you have a Micro-SD, get an adaptor).

Then, go to the `boot` partition and edit a file named `cmdline.txt` and add `init=/bin/sh`.

Next, boot the Pi. At the command line, type:
{% highlight bash %}
mount -o remount,rw /
{% endhighlight %}

Wait for a success message, then type:
{% highlight bash %}
passwd pi
{% endhighlight %}
substituting `pi` for your username.

It will ask you to enter the new password twice. If all goes well, unplug the Pi, open the `cmdline.txt` file on your machine, remove the final line
