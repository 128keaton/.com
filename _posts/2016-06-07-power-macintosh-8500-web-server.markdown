---
layout: post
title: "Power Macintosh 8500 Web Server"
date: "2016-06-07 17:22:55 -0500"
machine: "Power Macintosh 8500"
---
Well, I went and did it. I made my Power Macintosh 8500 into a Debian web server.
Installing Debian was a bit harder than expected, but thanks to the BootX software, it was eventually installed. The biggest issue was just getting all of the kernels in place.
Here is how my setup works:

* SCSI drive has a Mac OS 9.1 install, with the BootX app inside of the System Folder.
* ATA card, for my CD drive, and my ATA drive containing the Debian install.
* 96MB of RAM in the machine, which is 6MB from the bare minimum for installing/booting Debian.
*

I basically just booted the install CD, installed Debian to the ATA drive, shut down the machine, grabbed the kernels off the ATA drive, put them into the folder for BootX, and rebooted into the ATA drive. Also, Debian wouldn't detect my ethernet port, so I just installed a PCI-X Gigabit card with dual NICs. BootX is great, it really makes this install easier. I couldn't get the extension to work without the 'unexpected trap' error. I can just boot fully into OS 9, then into Debian. You can visit the web server's homepage here: [http://play.128keaton.com:82/about/](http://play.128keaton.com:82/about/).

## Q & A:

**Q: What about security?**

A: This is literally running the latest version of Debian and Apache2.

**Q: Well, why?**

A: Why not? It was a lot of fun, and quite a challenge.
