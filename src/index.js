import GitHubSDK from './GitHubSDK.js'

document.addEventListener('DOMContentLoaded', init)

const form = document.querySelector('.container__form--form')
const clearButton = document.querySelector('.clear__button')
const login = document.querySelector('.data__login')
const name = document.querySelector('.data__name')
const email = document.querySelector('.data__email')
const link = document.querySelector('.data__link')
const loc = document.querySelector('.data__location')
const repos = document.querySelector('.data__repos--amount')
const lastUpdated = document.querySelector('.data__last-updated')
const avatar = document.querySelector('.data__img')
const errorContainer = document.querySelector('.container__error')
const reposList = document.querySelector('.data-elements__list')
const hiddenEl = document.querySelectorAll('.hidden')

function init() {
    clearAll(clearButton)
    startSearch(form)
}

function startSearch(el) {
    el.addEventListener('submit', (event) => {
        event.preventDefault()
        runApi()
    })
}

function clearAll(e) {
    e.addEventListener('click', (event) => {
        location.reload()
    })
}

function runApi() {
    const user = document.querySelector('.input__username').value
    const gh = new GitHubSDK(user)
    getUserInfo()
    getUserRepos()

    function getUserInfo() {
        const ghData = gh.getUserData()
        ghData
            .then(data => {
                errorContainer.classList.add('container__error')
                login.innerText = data.login
                avatar.innerHTML = '<img src=' + data.avatar_url + ' class="data__avatar" />'
                if (data.name !== null) {
                    name.innerText = data.name
                }
                if (data.email !== null) {
                    email.innerText = data.email
                }
                link.innerHTML = `<a href="https://github.com/${user}">Link do profilu użytkownika</a>`
                if (data.location !== null) {
                    loc.innerText = data.location
                }
                repos.innerText = data.public_repos
                lastUpdated.innerText = data.updated_at
                hiddenEl.forEach(item => {
                    item.classList.remove('hidden')
                })
            })
            .catch(err => {
                hiddenEl.forEach(item => {
                    item.classList.add('hidden')
                })
                errorContainer.innerHTML = '<h3 class="error">' + err + '</h3> <p class="error">Sprawdź poprawność wprowadzonych danych</p>'
                errorContainer.classList.remove('container__error')
            })
    }

    function getUserRepos() {
        const ghRepos = gh.getRepos()
        reposList.innerHTML = ''
        ghRepos
            .then(data => {
                data.forEach((item, index) => {
                    const liElem = document.createElement('li')
                    liElem.innerHTML = `${index + 1}. ${item.name}, <a href="${item.html_url}">link</a>, opublikowany: ${item.pushed_at}`
                    reposList.appendChild(liElem)
                    liElem.classList.add('repo_list--element')
                })
            })
            .catch(err => {
                console.error(err)
            })
    }
}