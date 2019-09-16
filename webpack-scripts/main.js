import $ from 'jquery';
import ProjectManager from './classes/project-manager.js';
import CodeSnippets from './classes/code-snippets.js';
import LazyLoad from 'vanilla-lazyload';
import 'babel-polyfill';

window.$ = window.jQuery = $;

$(document).ready(function () {
    $(".projects-wrapper").slideDown();
    let codeSnippets = new CodeSnippets('.hljs');
    let lastScroll = 0;

    let projectManager = new ProjectManager("128keaton", ['IntelliJSettings', 'COMP-2150']);
    projectManager.fetchRepos().then(function (projects) {
        $('.no-data').hide();
        $.each(projects, function (i, project) {
            $('.pinned-repos-list').append(project.getListItem(i));
            showProject(i);
        });
    });

    codeSnippets.setInitialSnippet();

    async function showProject(i) {
        $("#project-" + i + " .pinned-repo-item-content").delay(100 * i).fadeIn({
            start: function () {
                $(this).css({
                    display: "flex"
                })
            }
        });
    }

    $(window).on("scroll resize", function () {
        const scrollOffset = $(window).scrollTop();

        if (scrollOffset >= (lastScroll + 50)) {
            codeSnippets.showNextSnippet();
            lastScroll = scrollOffset;
        } else if (scrollOffset <= (lastScroll - 50)) {
            codeSnippets.showLastSnippet();
            lastScroll = scrollOffset;
        }
    });


    new LazyLoad({
        elements_selector: ".lazy-load",
        to_webp: true
    });
});

