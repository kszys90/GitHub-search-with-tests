import GitHubSDK from './../src/GitHubSDK'
import nodeFetch from "node-fetch"
global.fetch = nodeFetch
import dotenv from 'dotenv'
dotenv.config()

const user = process.env.User_Github
const token = process.env.Secret_Token

describe('GitHubSDK', () => {
    
    describe('constructor config', () => {
        it('check if request adress is ok', () => {
            const gh = new GitHubSDK(user, token)
            expect(gh.gitHubAPI).toBe('https://api.github.com')
        })
        it('check if request user is ok', () => {
            const gh = new GitHubSDK(user, token)
            expect(gh.user).toBe(user)
        })
        it('check if request token is ok', () => {
            const gh = new GitHubSDK(user, token)
            expect(gh.secret).toBe(token)
        })
    })
    describe('getOptions', () => {
        it('should create object with options', () => {
            const gh = new GitHubSDK(user, token)
            const result = gh.getOptions()
            expect(result === null).toBe(false)
        })
    })
    
    describe('getUserData', () => {
        it('check if request adress is ok', () => {
            const gh = new GitHubSDK(user, token)
            expect(gh.gitHubAPI).toBe('https://api.github.com')
        })
        it('requested url is valid', () => {
            const gh = new GitHubSDK(user, token)
            const exampleUser = 'kszys90'
            const promise = gh.getUserData(exampleUser)
            return promise
                .then(data => { 
                    expect(data.url).toBe(`${gh.gitHubAPI}/users/${exampleUser}`)
                })
        })
        it('should get data from REST API', () => {
            expect.assertions(1)
            const gh = new GitHubSDK(user, token)
            const promise = gh.getUserData()
            return promise
                .then(data => {
                    expect(data === undefined).toBe(false)
                })
        })
        it('recived data should be an object', async () => {
            expect.assertions(1)
            const gh = new GitHubSDK(user, token)
            const result = await gh.getUserData()
            expect(typeof result).toBe(typeof {})
        })
        it('should not authorize if User not declared', () => {
            expect.assertions(1)
            const gh = new GitHubSDK()
            const promise = gh.getUserData()
            return promise
                .catch(err => {
                    expect(err.message).toBe('Error 404: Not found')
                })
        })
    })

    describe('getRepos', () => {
        it('should get data from REST API', () => {
            expect.assertions(1)
            const gh = new GitHubSDK(user, token)
            const promise = gh.getRepos()
            return promise
                .then(data => {
                    expect(data === undefined).toBe(false)
                })
        })
        it('recived data should be an object', () => {
            expect.assertions(1)
            const gh = new GitHubSDK(user, token)
            const result = gh.getRepos()
            expect(typeof result).toBe(typeof {})
        })
    })

})