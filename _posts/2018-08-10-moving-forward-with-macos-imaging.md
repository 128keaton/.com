---
title: Moving forward with macOS Imaging
layout: post
---
![Screen Shot 2018-08-10 at 3.49.39 PM](http://images.128keaton.com/Screen Shot 2018-08-10 at 3.49.39 PM.png)

Now that macOS Imaging is dead (and [is never coming back](https://support.apple.com/en-us/HT202770#sections)), I had to figure out a solution to replace DeployStudio here at ER2. Currently, we use a basic combination of cocoaDialog and bash to also mark the condition of any machine booted before imaging. The system is logged in our internal testing system and a label is adhered containing the specs. Then the machine is passed on to be cleaned before sale to a customer. This is great and all, but what if the machine has underlying issues, or severely overheats under strain *not* expressed during an install? Having a customer shipped what is essentially a defective laptop is the worst case scenario, but that inherently generates a lot of *waste* (at work, we are actively encouraged to eliminate waste)


The first idea was running a NetBoot recovery environment (similar to how Imagr or DeployStudio operates). Honestly, this is the way to do it. It boots extremely fast, only the bare minimum frameworks are loaded. For us, we get system specs using the `system_profiler` command, but in High Sierra's recovery environment, you do not have access to this command. The framework is *not* included for some bizarre reason, but its Apple 🤷🏻‍♂️.


Another caveat is that full acceleration GPU drivers are not loaded. Again, its to make the environment lighter and, I'm assuming, to allow it to boot in worse case scenarios where the GPU might be crippled, or the discrete GPU is disabled. Pure speculation on my part, however. The lack of full acceleration GPU drivers was another big problem for us. We use UNIGINE's [Heaven](https://benchmark.unigine.com/heaven) GPU stress-testing software to spot potential GPU/overheating problems. 

So, really, the next solution was a full bootable OS with tools built into the image. Sure, you could add GPU acceleration to the existing Recovery environment. And then you'd add the required extensions. Then, you've opened a can of worms. I do not know what I was doing wrong, but I couldn't get a Recovery environment to properly boot with the added extensions that I needed. To make the base image required, I used a modified version of AutoCasperNBI. The modifications were simple--AutoCasperNBI is an AppleScript-based project. If you do not know AppleScript, I'd recommend learning it, as it can make somethings like on boarding prompts, run-once applications, and droplets MUCH simpler than tackling a full Cocoa project.


![Screen Shot 2018-08-12 at 12.08.25 PM](http://images.128keaton.com/Screen Shot 2018-08-12 at 12.08.25 PM.png)
The modifications essentially disabled the Casper part of the project while keeping everything else. I didn't use Casper, nor did I need it. I just needed to make an NBI easily. I liked it the best (even with having to make modifications), since its easy to document for. I'd like to assume the person who will eventually replace me would appreciate a GUI-based application with screen shots to guide him/her through rebuilding an NBI.
