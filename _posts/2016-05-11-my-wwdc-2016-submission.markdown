---
layout: "post"
title: "My WWDC 2016 Submission"
date: "2016-05-11 14:00"
comments: false
---

<iframe width="854" height="480" src="https://www.youtube.com/embed/HQM8DY31G6Y" frameborder="0" allowfullscreen></iframe>




### Background Info:
 When I was diagnosed as diabetic, I struggled to find a diabetes application that fit my criteria. I needed it to sync with HealthKit, calculate my meals, and allow me to share my data with my doctor.

There is one other application that comes close, but it requires a subscription, and quite frankly, it was terribly designed.

### APIs/Technologies:
 I chose HealthKit because of its seamless integration into iOS. I really wanted something that, if in the future, I had to use an application for an insulin pump, I could also use my application. The only thing I would add to HealthKit is insulin units. I could've stored all of my information inside of HealthKit, but I had to make an external data source (NSMutableDictionary inside of an [NSMutableDictionary]). Last minute, I chose to make an Apple Watch companion. The documentation made it really easy to add that feature, along with the Today Extension.

### Issues:
 This is my first 'real' Swift application, and I have to say, I'm glad I learned the language. Objective-C is almost archaic in comparison. I did encounter a few bugs while working with dictionary and arrays (array[row][key] would crash the compiler and WYSIWYG editor), but a restart of Xcode usually fixed it temporarily. My biggest issue was keeping the data synced up properly. NSUserDefaults was a good idea, but I probably should have used CoreData in the end.

### What I would change:
 When I first  started this project, I didn't for-see it becoming this large (over 2000 lines of code). If I had more time, I'd definitely migrate to CoreData and implement an iCloud syncing metric. I'd also make the Apple Watch companion more in-depth as well. There is definitely room for UI changes, I feel that some aspects of the dashboard could be improved upon, but for how much data I made fit into the main screen, I think I did a good job.

{% capture update %}
Update: I was not chosen to visit WWDC 2016. Go ahead and have a glimpse at the winners. I am sad, for sure, that they picked a multi-year student over a first-time applicant. I am, however, moving to get Test Strip in the app store.
{% endcapture %}

<div class="notice--update">
  {{ update | markdownify }}
</div>
