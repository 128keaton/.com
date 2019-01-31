import $ from 'jquery';
import Project from './classes/project.js';
import ProjectManager from './classes/project-manager.js';

window.jQuery = $;
window.$ = $;

$(document).ready(function(){
    let junkRepos = ['IntelliJSettings', 'COMP-2150'];
    let projectManager = new ProjectManager("128keaton", "110f4bd9cef118020fb114cc32972297c321fd64", junkRepos);
    projectManager.fetchRepos().then(function(projects){
        $('.no-data').hide();
        $.each(projects, function(i, project){
            $('.pinned-repos-list').append(project.getListItem());
        });
    })

});

