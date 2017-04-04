---
layout: post
title: "QEMU with an El Capitan Guest"
date: "2016-08-25 16:26:08 -0500"
description: "Hacking OS X into a virtual machine, for science"
---

{% capture credit %}
#### Note:
This guide is largely based off <https://gist.github.com/gordonturner/2a2e5ecde5e7860b52e2>, but adapted for a newer Clover, QEMU, etc.
{% endcapture %}

<div class="notice--info">
  {{ credit | markdownify }}
</div>



## Setup:

* An Ubuntu Server running 16.04 LTS
  * KVM Capabilities
  * QEMU compiled/installed
  * OVMF compiled (<https://gist.github.com/gordonturner/85dcc321d2099d610e67>) and `/Build/OvmfX64/DEBUG_GCC49/FV/OVMF.fd` put in the base folder of your VM (`bios.bin`)
* A supported Mac that can download 10.11.6 from the Mac App Store
* A 8GB USB Drive
* Clover EFI Bootloader




## Step 1, creating the install drive:


With your OS X installer app in /Applications/, run:

 {% highlight bash %}
/Applications/Install\ OS\ X\ El\ Capitan.app/Contents/Resources/createinstallmedia --volume /Volumes/Untitled --applicationpath "/Applications/Install OS X El Capitan.app"
 {% endhighlight %}

Make sure you substitute `/Volumes/Untitled` for your thumb drive (must be formatted as HFS+, GPT). Wait for it to complete, it will take a decent amount of time.


## Step 2, installing Clover:


After downloading the Clover package, open it, and slowly click through until you see the 'Customize/Change Install Location' screen. Change the install location to the flash drive we just created, then click 'Continue', and then 'Customize'. You should have a list presented. Check the box beside 'Install for UEFI Booting Only', and open the triangle next to 'Driver64UEFI'. Check the boxes for `OsxAptioFixDrv-64` and `DataHubDxe-64`, then continue with the installation as normal. Now, the EFI partition should still be mounted (EFI in your sidebar). Download [this](https://github.com/JrCs/CloverGrowerPro/blob/9fc3991c7a82be1a0d096c3a2179098f35b69264/Files/HFSPlus/X64/HFSPlus.efi) file (HFSPlus.efi) and place it in /Volumes/EFI/EFI/CLOVER/drivers64UEFI/:


 {% highlight bash %}
 cp ~/Downloads/HFSPlus.efi /Volumes/ESP/EFI/CLOVER/drivers64UEFI/
 {% endhighlight %}




{% capture verbose %}
#### Note:
 If you want to have verbose boot (recommended), add `-v` to the BootFlags line in the `/Volumes/ESP/EFI/CLOVER/config.plist` file
{% endcapture %}

 <div class="notice--info">
   {{ verbose | markdownify }}
 </div>




## Step 3, getting the OSK value:


Please see [https://gist.github.com/gordonturner/c33bcc935e32f9fa6695](https://gist.github.com/gordonturner/c33bcc935e32f9fa6695) to get the OSK value (must be run from an actual Apple computer). Save this string and keep it safe for later.


## Step 4, writing the flash drive to an image:


Unmount and eject the flash drive from your machine, and plug it back in. Then, unmount the install El Capitan partition. Now, fire up terminal, and type `diskutil list`, find your install drive. (Should have two partitions: `EFI` and `Install OS X El Capitan`).  Record the disk number (e.g. `/dev/disk8`). `cd` into a comfortable folder `~/Desktop`, and run:

 {% highlight bash %}
 sudo dd if=/dev/rdiskX of=clover-usb-disk.dd
 {% endhighlight %}
Making sure you substitute `X` for your disk number.

After a bit of waiting, you should have a large file on your desktop named `clover-usb-disk.dd`, using your own methods, move this file into the root of your vm folder on your server.


## Step 5, final setup:


Now, we absolutely have to be on the Linux machine. Either SSH in, or gain physical access.
At the command line, use this command in your root VM folder:

 {% highlight bash %}
 sudo qemu-img create -f qcow2 osx-disk0.qcow2 200G
 {% endhighlight %}
Substitute `200G` for how many gigs you want, for 500Gb use `500G`.

Now, something a bit different, in order for OS X to boot beyond the kernel, we have to disable something:

 {% highlight bash %}
sudo su -
echo 1 > /sys/module/kvm/parameters/ignore_msrs


{% endhighlight %}

I didn't do much research into why, but it is important to run that. It is reset every reboot, so putting `echo 1 > /sys/module/kvm/parameters/ignore_msrs` into your `/etc/rc.local` file might not be a bad idea.


## Step 6, first boot:


Ok, brace yourself, this is my command to start my VM:
 {% highlight bash %}
 sudo qemu-system-x86_64 \
-m 8192 \
-enable-kvm \
-cpu core2duo,vendor=GenuineIntel \
-rtc base=localtime \
-smbios type=2 \
-machine q35,accel=kvm,usb=off,vmport=off \
-bios $VMROOT$/bios.bin \
-smp 4,sockets=1,cores=2,threads=2 \
-device isa-applesmc,osk="$OSK$" \
-device i82801b11-bridge,id=pci.1,bus=pcie.0,addr=0x1e \
-device pci-bridge,chassis_nr=2,id=pci.2,bus=pci.1,addr=0x1 \
-device ahci,id=sata0,bus=pci.2,addr=0x5 \
-drive file=$VMROOT$/clover-usb-disk.dd,if=none,id=drive-sata0-0-2,format=raw \
-device ide-hd,bus=ide.2,drive=drive-sata0-0-2,id=sata0-0-2,bootindex=1 \
-drive file=$VMROOT$/osx-disk0.qcow2,if=none,media=disk,id=drive-sata0-0-0,format=qcow2 \
-device ide-hd,bus=sata0.0,drive=drive-sata0-0-0,id=sata0-0-0 \
-usb \
-device usb-mouse \
-device usb-kbd \
-full-screen \
-vnc :1 \
-netdev bridge,id=br0,br=br0 \
-device virtio-net,netdev=br0,vectors=0,mac=00:00:00:00:00:00
{% endhighlight %}

Overwhelmed? Probably. Ok, you need to change a couple of things. First, change the `$OSK$` with your OSK string you saved earlier. Second, change the `$VMROOT$` occurrences to whatever your VM root is.
{% capture networking %}
#### Note:
 networking is a bit of a beast, but I know you can get it working. I won't be covering it, but the [virtio-net](https://github.com/pmj/virtio-net-osx) driver will help.
{% endcapture %}

 <div class="notice--info">
   {{ networking | markdownify }}
 </div>



After those edits, put it into the command line, and cross your fingers.


## Step 7, connecting and installing:


Now you need to connect to the VNC server that QEMU is hosting for your VM. For OS X, I use *Chicken of the VNC*, because the Screen Sharing app doesn't work with the server. Connect to your IP, and port `5901`. You should see either the Apple boot screen, the Setup companion, or Clover, depending on how fast you setup your VNC client.

{% capture vnc %}
#### Note:
screen/mouse mapping is broken over the QEMU VNC, you can get through the installer using Tab, Space, and Enter. The same person who wrote the network driver is working on a fix [here](https://github.com/pmj/QemuUSBTablet-OSX)

{% endcapture %}

 <div class="notice--info">
   {{ vnc | markdownify }}
 </div>


Use Disk Utility in the installer to format the QEMU HDD, and then run through the installer as normal.

Done!

### Other:

If you want to access the Clover drive to make some changes, follow [this](https://gist.github.com/gordonturner/2a2e5ecde5e7860b52e2#efi-disk-image-manipulation) guide to do that.

If you are having issues, feel free to comment below:
