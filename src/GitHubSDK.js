
class GitHubSDK {
    constructor(user, secret = null) {
        this.gitHubAPI = 'https://api.github.com'
        this.user = user
        this.secret = secret
    }
    getOptions() {
        const secret = process.env.Secret_Token
        return {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `token ${secret}`,
            },

        }
    }
    getUserData() {
        const url = `${this.gitHubAPI}/users/${this.user}`
        const options = this.getOptions()
        return this.sendRequest(url, options)
    }

    getRepos() {
        const url = `${this.gitHubAPI}/users/${this.user}/repos`
        const options = this.getOptions()
        return this.sendRequest(url, options)
    }

    sendRequest(url, options = {}) {
        return fetch(url, options)
            .then(resp => {
                if (resp.ok) { return resp.json() }
                if (resp.status === 401) { return Promise.reject('Error 401: Unauthorized') }
                if (resp.status === 403) { return Promise.reject('Error 403: Forbidden') }
                if (resp.status === 404) { return Promise.reject('Error 404: Not found') }
                return Promise.reject(resp)
            })
            .catch(error => {
                throw new Error(error)
            })
    }

    sendInvitation(task, name) {
        const secret = process.env.Secret_Token
        const url = `${this.gitHubAPI}/repos/${this.user}/${task}/collaborators/${name}`
        const options = {
            method: 'PUT',
            credentials: 'same-origin',
            redirect: 'follow',
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `token${secret}`
            },
            body: JSON.stringify({
                permission: 'pull'
            })
        }
        return this.sendRequest(url, options)
    }
}

export default GitHubSDK