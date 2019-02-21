import axios from 'axios';
import $ from 'jquery';
import Project from "./project";

class ProjectManager {

    constructor(repoOwner, junkRepos = []) {
        this.repoOwner = repoOwner;
        this.repos = [];
        this.junkRepos = junkRepos;
    }

    fetchRepos() {
        let manager = this;
        return axios({
            method: 'get',
            url: 'https://api.github.com/users/128keaton/repos',
            params: {
                type: 'all',
                direction: 'desc',
                sort: 'updated',
            },
        }).then(function (response) {
            // handle success
            manager.repos = [];
            jQuery.each(response.data, function (i, data) {
                if (manager.repos.length <= 9 && $.inArray(data['full_name'], manager.junkRepos) === -1 && $.inArray(data['name'], manager.junkRepos) === -1 && data['language'] !== null) {
                    let project = new Project(data, this.repoOwner);
                    manager.repos.push(project);
                }
            });
            return manager.repos;
        }).catch(function (error) {
            // handle error
            console.log(error);
            return manager.repos;
        })
    }


}

export default ProjectManager;
