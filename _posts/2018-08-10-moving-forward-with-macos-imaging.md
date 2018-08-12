---
title: Moving forward with macOS Imaging
layout: post
---
![Screen Shot 2018-08-10 at 3.49.39 PM](http://images.128keaton.com/Screen%20Shot%202018-08-10%20at%203.49.39%20PM.png)

## Prologue

Now that macOS Imaging is dead (and [is never coming back](https://support.apple.com/en-us/HT202770#sections)), I had to figure out a solution to replace DeployStudio here at ER2. Currently, we use a basic combination of cocoaDialog and bash to also mark the condition of any machine booted before imaging. The system is logged in our internal testing system and a label is adhered containing the specs. Then the machine is passed on to be cleaned before sale to a customer. This is great and all, but what if the machine has underlying issues, or severely overheats under strain *not* expressed during an install? Having a customer shipped what is essentially a defective laptop is the worst case scenario, but that inherently generates a lot of *waste* (at work, we are actively encouraged to eliminate waste)

## Building a NetBoot environment

The first idea was running a NetBoot recovery environment (similar to how Imagr or DeployStudio operates). Honestly, this is the way to do it. It boots extremely fast, only the bare minimum frameworks are loaded. For us, we get system specs using the `system_profiler` command, but in High Sierra's recovery environment, you do not have access to this command. The framework is *not* included for some bizarre reason, but its Apple 🤷🏻‍♂️.

Another caveat is that full acceleration GPU drivers are not loaded. Again, its to make the environment lighter and, I'm assuming, to allow it to boot in worse case scenarios where the GPU might be crippled, or the discrete GPU is disabled. Pure speculation on my part, however. The lack of full acceleration GPU drivers was another big problem for us. We use UNIGINE's [Heaven](https://benchmark.unigine.com/heaven) GPU stress-testing software to spot potential GPU/overheating problems. 

So, really, the next solution was a full bootable OS with tools built into the image. Sure, you could add GPU acceleration to the existing Recovery environment. And then you'd add the required extensions. Then, you've opened a can of worms. I do not know what I was doing wrong, but I couldn't get a Recovery environment to properly boot with the added extensions that I needed. To make the base image required, I used a modified version of AutoCasperNBI. The modifications were simple--AutoCasperNBI is an AppleScript-based project. If you do not know AppleScript, I'd recommend learning it, as it can make somethings like on boarding prompts, run-once applications, and droplets MUCH simpler than tackling a full Cocoa project.


![Screen Shot 2018-08-12 at 12.08.25 PM](http://images.128keaton.com/Screen%20Shot%202018-08-12%20at%2012.08.25%20PM.png)


The modifications essentially disabled the Casper part of the project while keeping everything else. I didn't use Casper, nor did I need it. I just needed to make an NBI easily. I liked it the best (even with having to make modifications), since its easy to document for. I'd like to assume the person who will eventually replace me would appreciate a GUI-based application with screen shots to guide him/her through rebuilding an NBI.

## Tools and Testing

Great. Perfect. We now have a fully bootable NBI. Next, we have to load it up with tools. As mentioned above, we use Heaven for GPU stress testing. For CPUs, we use [GIMPS Prime95](https://www.mersenne.org/download/) and assign it 'work' for 15 minutes. We time both Heaven and Prime95 with a custom application called [BarTimer](https://github.com/128keaton/BarTimer). To test the iSight camera, we simply use Photo Booth. Recording a video and playing it back tests speakers as well, knocking two birds out with one stone. To test USB ports, we use an application called [USBDetect](https://github.com/128keaton/USBDetect) that plays a sound and displays a notification when a USB device is plugged in and recognized. Finally, when testing is complete, and the machine as been evaluated, a label is printed and the machine is added to an internal device tracker that keeps up with specs and configurations. 

## Installing macOS

Arguably, the best way to install OR upgrade to macOS High Sierra is using Apple's `startosinstall` tool. It is a fantastic command line utility that will upgrade the machine's firmware to allow booting from APFS drives. It also installs macOS in the way Apple likes--it behaves exactly how the installation application does. This is a great way to start a macOS install. However, I didn't need this as we were starting from a full OS. But, we didn't bundle the install application inside the NetBoot image. This would be irresponsible--it would double the image size AND require the image to update when a new version of macOS came out. The way we currently utilize is having a start up script (we actually use [Outset](https://github.com/chilcote/outset) for this, fantastic utility) that mounts an NFS share containing the latest version of macOS. Then, a DMG containing the installer application is mounted, ready to install on the client machine. 

## Mocking 'macOS Utilities'

We wanted a simple way to launch applications and establish a 'workflow' of sorts. Sure, you could just use the Dock and Finder, but to an untrained user, it can easily be confusing. Our solution was a custom application, similar to the macOS Utilities you see on the Recovery partition. 

!()[https://raw.githubusercontent.com/128keaton/macOS-Utilities/master/macOS%20Utilities/screenshot.png]

At the bottom, there is a button to launch a 'macOS Install Kickoff' application. The utilities pane waits for the `/Volumes/Install macOS High Sierra` volume to become available. The [kickoff](https://github.com/128keaton/macOS-Installer-Kickoff) application checks for any existing APFS setup, removes it (since we are installing from Sierra), and erases the drive, readying it for install. 

## Final Notes

Moving forward, with T2 Apple machines (which do not allow booting from an external volume at all), the majority of this setup can be moved to an external drive and the applications/scripts can be used in a recovery environment (minus Heaven).

If anyone reading this is currently testing machines similar to above, I'd love to see your setup! Always looking for improvements!