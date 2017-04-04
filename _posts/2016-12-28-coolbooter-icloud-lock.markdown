---
layout: post
title: "iCloud Locked Downgrading"
date: "2016-12-28 23:58:24 -0600"
#head-image: https://i.sli.mg/aDpt3u.jpg
description: "Downgrading an iCloud locked phone."
---

Thanks to [Coolbooter](https://twitter.com/coolbooter), we can now downgrade to any capable versions that our 32-bit iDevices can run (iPad 2-4, iPhone 4-5c), but what if you have an iPhone that is iCloud locked?

{% capture read-noobies %}
#### Note:
Now, this isn't a 'work-around' per-se, just a way to get to the homescreen. Activation and whatnot is NOT guaranteed with this method, and you need to have the phone already jailbroken and you need to have homescreen access, i.e. no passcode. Coolbooter is in beta. BETA! It might break your phone.

Also, this has only been tested on iOS 6. ymmv.
{% endcapture %}

<div class="notice--info">
  {{ read-noobies | markdownify }}
</div>





## Step 1 - Installing Coolbooter.

If you haven't already, add the Coolbooter repo to Cydia (https://coolbooter.com) and install the Coolbooter Beta package. It's pretty straightforward.

## Step 2 - D-d-d-downgrading.

Select the version you want to install (once again, only tested on iOS 6) and install. Coolbooter takes a decent amount of time to download, parition and move everything into place. Then tap 'Boot' and boot into iOS 6. Run through the setup to verify that you can't log in to the locked account.


## Step 3 - Installing OpenSSH (because if you didn't you are doing it wrong).

Boot back into your main OS (just shut down and turn back on) and install 'OpenSSH' in Cydia. If you don't know how to SSH into your own device, then stop right here and contemplate your life choices and return at a later date.

### Note: change your OpenSSH root password using `passwd`

<div id="stahp">

## Step 3a - Contemplating your life choices.

Are you one of those people who post on /r/jailbreak like its your personal Google? Stop it. You are bad. Do you reply to @qwertyuiop's tweets asking 'eta wen' or other begging crap? Stop it. You are bad.

</div>

## Step 4 - Mounting the secondary partition.

First, list your devices or partitions in your SSH session with `ls /dev/`, I'd bet some serious money your iOS 6 partition is something like `/dev/disk0s1s3`. If a mounting point (e.g. `/mnt`) doesn't exist, make one with `mkdir /mnt`. Finally, run:

{% highlight bash %}
 mount -t hfs /dev/disk0s1s3 /mnt
{% endhighlight %}

Substitute `/dev/disk0s1s3` for your device.

## Step 5 - Removing the setup app.

We're almost DUNNN. Just run:
{% highlight bash %}
cd /mnt/Applications && rm -rf Setup.app
{% endhighlight %}

Boot back into your secondary OS and you should see a lockscreen instead of a setup screen



If you broke some stuff, sorry, your fault
