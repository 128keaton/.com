---
layout: post
title:  "MacPro4,1 CPU Upgrade Adventure"
date: 2016-04-12 12:50:03 -0500
categories: Engineering
---
This has been a heck of a ride. About a week ago, I became annoyed at my cores being eaten up by multiple processes (FCP, AF, PS, Xcode, you get the picture) and decided to future-proof my machine for a mere $99 + free shipping.

I bought a pair of 2.4 GHz, 6 core Xeons to replace my 2.33 GHz, 4 core Xeons inside of my Mac Pro. I bought the extra 2MM of thermal padding, I bought the right hex head (with a proper handle for counting turns).

CPU A went in easy enough, after a bit of tightening. CPU B, however, was a troublesome pain. The Tdiode wasn't recognized in OS X. I removed, reseated (taking care to clear dust, if any) and retightened. I played the "tighten and pray" ballet more times than I could count, and still no luck.

Finally, I looked at the CPU itself. I knew there was a black mark on the contact, I just though the copper contact was slightly more oxidized and thought nothing of it, until now. The more I looked at it, the more it looked like a burn or something similar.


{% capture update %}
#### Update:
Basically, there were three pins that were screwed. My employer was actually able to trade me a 5,1, and the upgrade process went smoothly enough.
{% endcapture %}

<div class="notice--update">
  {{ update | markdownify }}
</div>
