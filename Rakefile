#############################################################################
#
# Modified version of jekyllrb Rakefile
# https://github.com/jekyll/jekyll/blob/master/Rakefile
#
#############################################################################

require 'rake'
require 'date'
require 'yaml'
require 'net/scp'

CONFIG = YAML.safe_load(File.read('_config.yml'))
USERNAME = CONFIG['username'] || ENV['GIT_NAME']
REPO = CONFIG['repo']
SSH_PASSWORD = ENV['SSH_PASSWORD'] || 'hunter2'
SSH_USERNAME = '128keaton.com'.freeze
SSH_HOST = '128keaton.com.customers.tigertech.net'.freeze
IMAGES_DIR = __dir__ + '/images/'

SOURCE_BRANCH = 'pre-publish'.freeze
DESTINATION_BRANCH = 'gh-pages'.freeze

def check_destination
    unless Dir.exist? CONFIG['destination']
        sh "git clone https://#{ENV['GIT_NAME']}:#{ENV['GH_TOKEN']}@github.com/#{USERNAME}/#{REPO}.git #{CONFIG['destination']}"
    end
end

namespace :site do
    task :get_posts do
        puts 'Grabbing submodules'
        sh 'git pull && git submodule init && git submodule update && git submodule status'
    end
    task :upload_images do
        puts 'Correcting blog posts'
        Dir.entries(__dir__ + '/_posts/').each do |file_name|
            next unless File.extname(file_name) == '.md' || File.extname(file_name) == '.markdown'
            text = File.read(__dir__ + '/_posts/' + file_name)
            fixed = text.gsub('![](/', '![](http://images.128keaton.com/')
            File.open(__dir__ + '/_posts/' + file_name, 'w') { |file| file.puts fixed }
        end
        puts "Uploading blog posts.."
        sh "cd " + __dir__ + "/_posts/"
        sh "git add --all ."
        sh "git commit -m 'Updating blog posts.'"
        sh "git push --quiet && cd ../"
        puts 'Uploading images..'
        options = { recursive: true, password: SSH_PASSWORD }
        Net::SCP.upload!(SSH_HOST, SSH_USERNAME, __dir__ + '/images/', '/home/12/128keaton.com/html/', options)
        puts 'All images have been upload and removed in ' + IMAGES_DIR
        FileUtils.rm_rf(Dir.glob(IMAGES_DIR + '*'))
    end
    desc 'Generate the site and push changes to remote origin'
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
        sh 'git pull && git submodule init && git submodule update && git submodule status'
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
end
