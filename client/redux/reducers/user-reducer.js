import { history } from '..'
import { requestRepos, requestReadmeUrl, requestUrl } from '../../api/api'

const SET_USERNAME = 'github-browser/SET_USERNAME'
const SET_REPO_NAME = 'github-browser/SET_REPO_NAME'
const SET_USERNAME_ERROR = 'github-browser/SET_USERNAME_ERROR'
const SET_REPOS_ARRAY = 'github-browser/SET_REPOS_ARRAY'
const SET_REPOS_ERROR = 'github-browser/SET_REPOS_ERROR'
const SET_README_CONTENT = 'github-browser/SET_README_CONTENT'
const SET_HAS_NO_README = 'github-browser/SET_HAS_NO_README'
const SET_ERROR_TEXT = 'github-browser/SET_ERROR_TEXT'

const initialState = {
  username: '',
  usernameError: null,
  repoName: null,
  reposArray: [],
  reposError: null,
  readmeContent: null,
  hasNoReadme: null,
  errorText: null
}

export const setUsername = (username) => ({ type: SET_USERNAME, payload: username })

const setUsernameError = (usernameError) => ({ type: SET_USERNAME_ERROR, payload: usernameError })

const setReposArray = (reposArray) => ({ type: SET_REPOS_ARRAY, payload: reposArray })

const setReposError = (reposError) => ({ type: SET_REPOS_ERROR, payload: reposError })

const setReadmeContent = (readmeContent) => ({ type: SET_README_CONTENT, payload: readmeContent })

const setHasNoReadme = (hasNoReadme) => ({ type: SET_HAS_NO_README, payload: hasNoReadme })

const setErrorText = (errorText) => ({ type: SET_ERROR_TEXT, payload: errorText })

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME: {
      return {
        ...state,
        repoName: null,
        usernameError: null,
        reposArray: [],
        reposError: null,
        username: action.payload
      }
    }
    case SET_REPO_NAME: {
      return {
        ...state,
        readmeContent: null,
        hasNoReadme: null,
        errorText: null,
        repoName: action.payload
      }
    }
    case SET_USERNAME_ERROR: {
      return {
        ...state,
        readmeContent: null,
        hasNoReadme: null,
        errorText: null,
        usernameError: action.payload
      }
    }
    case SET_REPOS_ARRAY: {
      return { ...state, reposArray: action.payload }
    }
    case SET_REPOS_ERROR: {
      return { ...state, reposError: action.payload }
    }
    case SET_README_CONTENT: {
      return { ...state, readmeContent: action.payload }
    }
    case SET_HAS_NO_README: {
      return { ...state, hasNoReadme: action.payload }
    }
    case SET_ERROR_TEXT: {
      return { ...state, errorText: action.payload }
    }
    default:
      return state
  }
}

const getReadmeContent = (username, repoName) => async (dispatch) => {
  try {
    const response = await requestReadmeUrl(username, repoName)
    const readmeContentResponse = await requestUrl(response.data.download_url)
    dispatch(setReadmeContent(readmeContentResponse.data))
  } catch (err) {
    if (err && err.response.status === 404) {
      dispatch(setHasNoReadme('This repository doesn’t have a README.MD'))
    } else {
      dispatch(setErrorText(err.response.data.message || 'Error happenned'))
    }
  }
}

export const setRepoName = (username, repoName) => (dispatch) => {
  dispatch({ type: SET_REPO_NAME, payload: repoName })
  dispatch(getReadmeContent(username, repoName))
  history.push(`/${username}/${repoName}`)
}

const getRepositories = (username, repoName) => async (dispatch) => {
  try {
    const response = await requestRepos(username)
    if (response.data.length === 0) {
      dispatch(setReposError(`${username} doesn’t have any public repositories yet`))
    } else {
      const reposArray = response.data
      dispatch(setReposArray(reposArray))
      if (repoName) {
        const repoArrItem = reposArray.filter((it) => it.name === repoName)
        if (repoArrItem.length) {
          dispatch(setRepoName(username, repoName))
        } else dispatch(setErrorText('This user have no such repository'))
      }
    }
  } catch (err) {
    if (err && err.response.status === 404) {
      dispatch(setUsernameError('No such user'))
    } else {
      dispatch(setErrorText(err.response.data.message || 'Error happenned'))
    }
  }
}

export const onUserFormSubmit = (username, repoName) => async (dispatch) => {
  if (username.length === 0) {
    dispatch(setUsername(''))
    dispatch(setUsernameError('Please enter username'))
    history.push('/')
  } else {
    dispatch(setUsername(username))
    dispatch(getRepositories(username, repoName))
    history.push(`/${username}`)
  }
}

export default userReducer
