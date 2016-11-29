---
layout: post
title: "Upgrading the Power Macintosh 8500"
date: "2016-05-03 16:15:50 -0500"
style: vintage
comments: true
---
Originally introduced in 1995, the Power Macintosh 8500 was a working class man's machine. For $4,000, you could buy mini-tower machine with a 120MHz CPU with a FPU. It also had some really nice A/V features, so you could import little Timmy's birthday from your S-Video camera. All-in-all, not a bad machine. The average going rate for these on eBay are about $39. I picked up two in poor condition for $20, good price. I built up one out of parts of both, but I didn't really get around to playing with it, until now.

First things first, I opened it up again. No hard drives or caddies. Shame, since is an older SCSI format. No IDE on this old boy. I went to eBay, in search of a decent, and cheap card, and I couldn't really find a suitable one, until A friend directed me to a generic card, that was advertised as working. I ordered it from China and waited. And waited. However, a week before I got the card, I found something really cool at work.

![](https://i.sli.mg/C3NYIv.jpg)

An Adaptec HotConnect 8945, not only for PCs, but it was Macintosh compatible as well.

Sweet!

Lets open that box!

![](https://i.sli.mg/Ow1eIZ.jpg)

Look at all of those goodies.

We have (from bottom to top, left to right):


* Registration/readme card.
* User Manual (with a ton of tips and other good information)
* A (new?)SCSI to (older?) SCSI adaptor.
* A FireWire to DV cable.
* The bundled software CD.
* A Windows NT/95 install floppy.
* Molex to bus power.
* Long, gray FireWire cable.
* External SCSI cable.
* Portable SCSI->Large SCSI Adaptor.
* The card itself (one internal SCSI, one external, 1 internal FireWire, 2 external FireWire).
* One, very long, SCSI cable with a terminator on the end.

A very sweet package!

Here is a close shot of the card:

![](https://i.sli.mg/me5vmB.jpg)

Doesn't really look used at all.

Anyway, onto the upgrading.

First, after trial-and-error, both of my Apple SCSI CD-ROM drives didn't want to read anything. Wouldn't spin up worth a darn. From a recommendation, I tried using an IDE CD ROM, with my fancy ATA card, and it worked. I did not believe it. Next, since I was all out of IDE cables long enough, I decided to use the SCSI card too. Hey, its cool, right? I paired it up with a 10,000 RPM (!!!) Jaguar drive that came in a QuickSilver, long broken. I was able to reassemble the case, just fine, and booted the installer. After about five minutes, OS 9.1 was rocking on the 8500.


![](https://i.sli.mg/d8HuPU.jpg)


Final specs:

* ATA100 card, with CD-RW drive.
* SCSI card, with 10,000 RPM drive.
* 46MB of RAM.
* 150MHz CPU, not the lowly 120MHz.

Not too shabby.

Maybe sometime soon, I'll put Tiger on it, along side some more RAM.

Oh, I was also able to solve the Kanga Conundrum. The ATA card I purchased featured an Onboard PATA connector, so I booted into 9.1 and blessed the new drive. Problem solved.

![](https://i.sli.mg/KqKluz.jpg)
