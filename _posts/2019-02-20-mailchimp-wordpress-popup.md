---
title: Using a MailChimp Popup Form on Wordpress On Click
layout: post
head-image: /images/mailchimp-logo.png
---

I was recently tasked with adding a MailChimp form to our website. The trick was adding it to trigger with a button press. 
First, I set up our plugin to load the Javascript from MailChimp:

For example:
```php
function add_postchimp_js(){
	echo '<script type="text/javascript" src="https://downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js" data-dojo-config="usePlainJson: true, isDebug: false">';
}

add_action( 'wp_head', 'add_postchimp_js' );
```


Next, I created a Javascript file similar to the following:
```javascript
(function($) {
	$(window).load(function () {
		'use strict';

		let downloadButton = $("a span:contains('Download')").filter(function() { return $(this).children().length === 0;}).parent();
		if ($('#home-carousel').has(downloadButton)){
			downloadButton.click( function(e) {
				e.preventDefault(); 
				displayEmailAlert();
				return false; 
			});
		}

	}); 
}(jQuery));

function displayEmailAlert(){
	document.cookie = 'MCPopupClosed=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'MCPopupSubscribed=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    console.log(mailchimp);
	window.dojoRequire(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":mailchimp.base_url,"uuid":mailchimp.uuid,"lid":mailchimp.id,"uniqueMethods":true}) })
}
```

I simply passed the MailChimp settings through WordPress's `wp_localize_script` function, like so:

```php
add_action('wp_enqueue_scripts', 'load_popup_scripts');

function load_popup_scripts() {
	wp_enqueue_script('email-popup', plugins_url('/assets/js/download-alert.js',__FILE__));
	$mailchimpOptions = ['base_url' =>  get_option('mailchimp_base_url'), 'uuid' =>  get_option('mailchimp_form_uuid'), 'id' =>  get_option('mailchimp_list_id')];
	wp_localize_script('email-popup', 'mailchimp', $mailchimpOptions);
}
```

As a result, I have a perfectly working MailChimp popup with Wordpress. I did not have to add jQuery to the root of the site, nor did I have to add the scripts with Javascript.

![](/images/mailchimp-form.png)