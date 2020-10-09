import axios from 'axios'

export const requestRepos = (username) => {
  const url = `https://api.github.com/users/${username}/repos`
  return axios.get(url)
}

export const requestReadmeUrl = (repoUrl) => {
  return axios.get(`${repoUrl}/readme`)
} 

export const requestUrl = (url) => {
  return axios.get(url)
}