import axios from 'axios'

export const requestRepos = (username) => {
  const url = `https://api.github.com/users/${username}/repos`
  return axios.get(url)
}

export const requestReadmeUrl = (username, repoName) => {
  return axios.get(`https://api.github.com/repos/${username}/${repoName}/readme`)
}

export const requestUrl = (url) => {
  return axios.get(url)
}
