import $ from 'jquery';
import ProjectManager from './classes/project-manager.js';
import LazyLoad from 'vanilla-lazyload';
import 'babel-polyfill';

window.$ = window.jQuery = $;

$(document).ready(function () {

    let projectManager = new ProjectManager("128keaton", ['IntelliJSettings', 'COMP-2150']);
    projectManager.fetchRepos().then(function (projects) {
        $('.no-data').hide();
        $.each(projects, function (i, project) {
            $('.pinned-repos-list').append(project.getListItem());
        });
    });


    new LazyLoad({
        elements_selector: ".lazy-load",
        to_webp: true
    });
});

