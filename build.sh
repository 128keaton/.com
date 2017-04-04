#!/bin/bash

# only proceed script when started not by pull request (PR)
if [ $TRAVIS_PULL_REQUEST == "true" ]; then
  echo "this is PR, exiting"
  exit 0
fi

if [[ `git status --porcelain` ]]; then
# enable error reporting to the console
set -e

# build site with jekyll, by default to `_site' folder
git pull && git submodule init && git submodule update && git submodule status

 bundle exec jekyll build

# cleanup
rm -rf ..site

#clone `master' branch of the repository using encrypted GH_TOKEN for authentification
git clone https://${GH_TOKEN}@github.com/128keaton/128keaton.com.git ../site

# copy generated HTML site to `master' branch
cp -R _site/* ../site

# commit and push generated content to `master' branch
# since repository was cloned in write mode with token auth - we can push there
cd ../site

git config user.email "keaton.burleson@me.com"
git config user.name "Keaton Burleson"
git add -A .
git commit -a -m "Travis #$TRAVIS_BUILD_NUMBER"
git push --quiet origin gh-pages > /dev/null 2>&1
else
  echo "no changes"
  exit 0
fi
