---
layout: post
title: "Travis CI and Jekyll"
date: "2017-04-05 00:03:41 -0500"
description: My how to on running a Jekyll blog hosted on GitHub Pages, with Travis CI in the middle
cover_image: http://images.128keaton.com/pipeline.JPG
tags: travis, jekyll, blog, github
published: true
---
## Preface:
When I first started blogging with Jekyll, my setup was a *wreck*. I didn't quite understand Liquid Templating, so there wasn't a lot a reuse, tons of unnecessary CSS, and plenty of plain ol' HTML kludges. I still really liked Jekyll. It was fast, hosting for it was cheap, and free if you used GitHub Pages, which I didn't at the time. The two things I didn't like about Jekyll was the lack of portability, and of easy publishing.


Easy publishing is really two things. One, I didn't like having to clone my repo, run `bundle install` and make sure everything carried over properly (side-note: as tempting as it may be, do not use submodules for any directory) and then building and publishing. Then, as I stated above, I wasn't using GitHub Pages, so I basically compiled the site and uploaded the whole thing to my website. Terrible, right?  

And then, there is the problem of images. I like having some images in my posts, in fact, a decent amount of my posts revolve around images. If you roll your own hosting with Jekyll, its easy to take care of, but with GitHub pages, its a nightmare for portability, even with submodules. If you don't have all your images when you build--why would Jekyll carry the images over into your site!

Those two tidbits will be important in a minute after I explain the next part.

Fast-forward to my blog, 2.0, I decided to ditch self hosting and migrate to GitHub for the simple ease of doing "git commit -m blah && git push" and having GitHub do the dirty work. And this worked, pretty well. Remember my image heavy pages? Night. Mare. As it stands right now, my images directory on my web server is 119MB. 119MB I'd throw around on GitHub. Bleh, not fun for mobile blogging.

Recently, I'd had enough blog posts that scrolling through them all was a pain. I decided a simple pagination plugin for Jekyll would suffice--until I learned that it wasn't supported on GitHub Pages. "No" I howled in rage. I did a quick bit of googling and learned that with a bit of Ruby, I could ~abuse~ use Travis to help with the heavier lifting, by-passing the building service of GitHub, and just taking advantage of that sweet, sweet hosting.

Before I begin the how to part, I'd like to say I still use my web hosting for the images. In fact, that is a key part. I'd like to think that my script can be adapted to be used with another service, other than your own.

## How-to:

### Prerequisites:
* An image host that you can use with an API
* Jekyll
* Two branches on your public GitHub repo (gh-pages and a source repo)
* Eyes
* A personal access token
* Travis access to your public GitHub repo

See where this is going?

Basically, whenever you push your source branch to GitHub, Travis builds the site, and then pushes it to your gh-pages repo, precompiled. This opens up the door for so many more possibilities, like testing!

Sure, the build times are a bit slower, but it works so much better!

Here is an example of my .travis.yml file:

``` yaml
language: ruby
cache: bundler
install:
- bundle install
script: bundle exec rake site:deploy --quiet
rvm:
- 2.1.2
env:
  global:
    secure: /* remove this line */
```

For that `secure` bit, remove that whole line, and run this command:
`gem install travis`
and then:
 `travis encrypt 'GIT_NAME="YOUR_USERNAME" GIT_EMAIL="YOUR_EMAIL" GH_TOKEN=YOUR_TOKEN'`

Make sure you replace the appropriate variables.

Now, for an exerpt from the Rakefile:

``` rb
....
    task :deploy do
        # Detect pull request
        if ENV['TRAVIS_PULL_REQUEST'].to_s.to_i > 0
            puts 'Pull request detected. Not proceeding with deploy.'
            exit
        end

        # Configure git if this is run in Travis CI
        if ENV['TRAVIS']
            sh "git config --global user.name '#{ENV['GIT_NAME']}'"
            sh "git config --global user.email '#{ENV['GIT_EMAIL']}'"
            sh 'git config --global push.default simple'
        end

        # Make sure destination folder exists as git repo
        check_destination

        sh "git checkout #{SOURCE_BRANCH}"
        Dir.chdir(CONFIG['destination']) { sh "git checkout #{DESTINATION_BRANCH}" }

        # Generate the site
        sh 'bundle exec jekyll build'

        # Commit and push to github
        sha = `git log`.match(/[a-z0-9]{40}/)[0]
        Dir.chdir(CONFIG['destination']) do
            sh 'git add --all .'
            sh "git commit -m 'Updating to #{USERNAME}/#{REPO}@#{sha}.'"
            sh "git push --quiet origin #{DESTINATION_BRANCH}"
            puts "Pushed updated branch #{DESTINATION_BRANCH} to GitHub Pages"
        end
    end
....
```

(the whole file is available [here](https://gist.github.com/128keaton/c7a2bb21ca225fe24b7b1beb4836ff4b))

That there is a big-honkin mess.

Basically, when Travis runs `bundle exec rake site:deploy`, it checks if its a PR, sets up git, makes sure the destination folder exists, pulls the site, checks out the source branch, builds the site, then commits and finally pushes the site. Phew!

Here are the appropriate config.yml lines you'll need to add:

``` yaml
username: your-github-username
repo: repo-name
branch: source-branch
destination: ../site/
```

If you set this up correctly, pushing to GitHub should result in a successful Travis build and deploy.

Now, onto the fun part: Images!

In my Rakefile, I have two helper tasks:

``` ruby
...
    task :correct_posts do
        puts 'Correcting blog posts'
        Dir.entries(__dir__ + '/_posts/').each do |file_name|
            next unless File.extname(file_name) == '.md' || File.extname(file_name) == '.markdown'
            text = File.read(__dir__ + '/_posts/' + file_name)
            fixed = text.gsub('](http://images.128keaton.com/', '](http://images.128keaton.com/')
            fixed = fixed.gsub('', '')
            File.open(__dir__ + '/_posts/' + file_name, 'w') { |file| file.puts fixed }
        end
        Rake::Task["site:upload"].execute
    end
    task :upload_images do
        puts 'Uploading images..'
        options = { recursive: true, password: SSH_PASSWORD }
        Net::SCP.upload!(SSH_HOST, SSH_USERNAME, __dir__ + '/images/', '/home/12/128keaton.com/html/', options)
        puts 'All images have been upload and removed in ' + IMAGES_DIR
        FileUtils.rm_rf(Dir.glob(IMAGES_DIR + '*'))
    end
...
```

The first task checks all of my posts for any 'stale' image links, ones that were from olden blog times, or ones without my 'CDN' before them. It simply prepends them and moves on. My second task actually uploads my images and deletes them from the repo so they aren't sucked up by git. It simply uses Net::SCP to SCP them to my remote server. Not bad, huh?  I imagine anyone with time and some experience can rework that task to support anything they want, I just use my own hosting since its easy!

## Final thoughts

Although I don't have a fully portable Jekyll setup as I'd like, I still think this is a really robust way to keep your site built how you want it (with logs!) and keep your images where you want them. A fun thing I can do is SSH into my home machine (or mount the site folder with SSHFS) on the go, write a post, and run another helper method `bundle exec rake site:upload`, which is like this:

``` rb
  task :upload do
      puts 'Uploading site'
      sha = `git log`.match(/[a-z0-9]{40}/)[0]
      sh 'git add --all .'
      sh "git commit -m 'Updating to #{USERNAME}/#{REPO}@#{sha}.'"
      sh "git push --quiet origin #{SOURCE_BRANCH}"
      puts "Pushed updated branch #{SOURCE_BRANCH} to GitHub Pages"
  end
```

Couple this with some Atom Jekyll plugins, and it makes working with Jekyll a lot more enjoyable day-to-day.

## Credits:

* [Original repo that pointed me in the right direction](https://github.com/mfenner/jekyll-travis)
* [Medium post that helped conjure up the thought](https://medium.com/@nthgergo/publishing-gh-pages-with-travis-ci-53a8270e87db)
