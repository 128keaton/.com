class Project {
    // expects a github project repo data from the GitHub API


    constructor(data, ownerName) {
        this.starCount = data['stargazers_count'];
        this.owner = data['owner']['login'];
        this.url = data['html_url'];
        this.description = data['description'];
        this.forkCount = data['forks_count'];
        this.language = data['language'];
        this.forksURL = data['forks_url'];
        this.stargazersURL = data['stargazers_url'];

        if (this.owner !== ownerName) {
            this.name = data['full_name'];
        } else {
            this.name = data['name'];
        }

    }

    getListItem() {
        let base = '<li class="pinned-repo-item"><div class="pinned-repo-item-content"><span><a href="' + this.url + '" class="repo-link">';
        let name = '<span class="name">' + this.name + '</span></a></span>';

        let description = '<p class="pinned-repo-desc">' + this.description + '</p>';
        let metadata = '<p><span class="repo-language-color pinned-repo-meta ' + this.language.toLowerCase() + '"></span>' + this.language;

        let stargazers = '<a href="' + this.stargazersURL + '" class="pinned-repo-meta muted-link stargazers-link"><svg aria-label="stars" class="octicon octicon-star" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img">';
        stargazers += '<path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>' + this.starCount + '</a>';

        let network = '<a href="' + this.forksURL + '" class="pinned-repo-meta muted-link network-link"><svg aria-label="forks" class="octicon octicon-repo-forked" viewBox="0 0 10 16" version="1.1"width="10" height="16" role="img">';
        network += '<path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>' + this.forkCount + '</a>';

        let closing = '</p></div></li>';

        return base + name + description + metadata + stargazers + network + closing;
    }
}

export default Project;
