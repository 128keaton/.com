import $ from 'jquery';
import ProjectManager from './classes/project-manager.js';
import LazyLoad from 'vanilla-lazyload';
import axios from 'axios';
import 'babel-polyfill';

window.$ = window.jQuery = $;

$(document).ready(function () {

    const requestToken = async () => {
        try {
            return await axios.get('https://stuff.128keaton.com/sec/r.php')
        } catch (error) {
            console.error(error)
        }
    };

    const fetchRepoWithToken = async (token) => {
        let junkRepos = ['IntelliJSettings', 'COMP-2150'];
        let projectManager = new ProjectManager("128keaton", token, junkRepos);

        projectManager.fetchRepos().then(function (projects) {
            $('.no-data').hide();
            $.each(projects, function (i, project) {
                $('.pinned-repos-list').append(project.getListItem());
            });
        });
    };

    const getToken = async () => {
        if (process.env.GH_TOKEN) {
            return fetchRepoWithToken(process.env.GH_TOKEN);
        } else {
            const tokenRequest = await requestToken();

            if (tokenRequest.data.key) {
                return fetchRepoWithToken(tokenRequest.data.key);
            }
        }
    };

    getToken();

    new LazyLoad({
        elements_selector: ".lazy-load",
        to_webp: true
    });
});

