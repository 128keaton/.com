import $ from 'jquery';
import ProjectManager from './classes/project-manager.js';
import LazyLoad from 'vanilla-lazyload';
import 'babel-polyfill';

window.$ = window.jQuery = $;

$(document).ready(function () {

    $(".projects-wrapper").slideDown();

    let projectManager = new ProjectManager("128keaton", ['IntelliJSettings', 'COMP-2150']);
    projectManager.fetchRepos().then(function (projects) {
        $('.no-data').hide();
        $.each(projects, function (i, project) {
            $('.pinned-repos-list').append(project.getListItem(i));
            showProject(i);
        });
    });


    async function showProject(i){
            $("#project-" + i + " .pinned-repo-item-content").delay(100 * i).fadeIn({
                start: function () {
                    $(this).css({
                        display: "flex"
                    })
                }
            });
    }


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    new LazyLoad({
        elements_selector: ".lazy-load",
        to_webp: true
    });
});

