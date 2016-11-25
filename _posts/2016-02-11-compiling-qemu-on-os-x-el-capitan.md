---
layout: post
status: publish
published: true
title: "Compiling QEMU on OS X El Capitan"
date: 2016-02-11 09:17:35 -0600

---
## Prerequisites: 

* Xcode
* Xcode Command Line Utilities
* Homebrew
* wget


### Step 1:

Install glib (a QEMU requirement) and pixman (since the QEMU variant is borked):

`brew install glib pixman`

### Step 2:

Fetch QEMU from their repository:


`wget http://wiki.qemu-project.org/download/qemu-2.5.0.tar.bz2`

and unzip:

`tar xvjf qemu-2.5.0.tar.bz2 && cd qemu-2.5.0`



then remove the broken pixman library:


`rm -r pixman`

### Step 3:

Build!


`./configure && make && sudo make install`

Done!

 
                    
                    
