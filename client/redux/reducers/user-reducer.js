import { requestRepos, requestReadmeUrl, requestUrl } from '../../api/api'

const SET_USERNAME = 'github-browser/SET_USERNAME'
const SET_REPO_URL = 'github-browser/SET_REPO_URL'
const SET_USERNAME_ERROR = 'github-browser/SET_USERNAME_ERROR'
const SET_REPOS_ARRAY = 'github-browser/SET_REPOS_ARRAY'
const SET_REPOS_ERROR = 'github-browser/SET_REPOS_ERROR'
const SET_README_CONTENT = 'github-browser/SET_README_CONTENT'
const SET_HAS_NO_README = 'github-browser/SET_HAS_NO_README'
const SET_ERROR_TEXT = 'github-browser/SET_ERROR_TEXT'

const initialState = {
  username: '',
  usernameError: null,
  repoUrl: null,
  reposArray: [],
  reposError: null,
  readmeContent: null,
  hasNoReadme: null,
  errorText: null
}

const setUsername = (username) => ({ type: SET_USERNAME, payload: username })

const setUsernameError = (usernameError) => ({ type: SET_USERNAME_ERROR, payload: usernameError })

const setReposArray = (reposArray) => ({ type: SET_REPOS_ARRAY, payload: reposArray })

const setReposError = (reposError) => ({ type: SET_REPOS_ERROR, payload: reposError })

const setReadmeContent = (readmeContent) => ({ type: SET_README_CONTENT, payload: readmeContent })

const setHasNoReadme = (hasNoReadme) => ({ type: SET_HAS_NO_README, payload: hasNoReadme })

const setErrorText = (errorText) => ({ type: SET_ERROR_TEXT, payload: errorText })

const userReducer = (state = initialState, action) => {
  console.log('userReducer', state, action)
  switch (action.type) {
    case SET_USERNAME: {
      return {
        ...state,
        repoUrl: null,
        usernameError: null,
        reposArray: [],
        reposError: null,
        username: action.payload
      }
    }
    case SET_REPO_URL: {
      return {
        ...state,
        readmeContent: null,
        hasNoReadme: null,
        errorText: null,
        repoUrl: action.payload
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

const getRepositories = (username) => async (dispatch) => {
  try {
    const response = await requestRepos(username)
    // setErrorText(response.data[0].url)
    if (response.data.length === 0) {
      dispatch(setReposError(`${username} doesn’t have any public repositories yet`))
    } else {
      dispatch(setReposArray(response.data))
    }
  } catch (err) {
    if (err.response.status === 404) {
      dispatch(setUsernameError('No such user'))
    } else {
      dispatch(setErrorText(err.response.data.message))
    }
  }
}

const getReadmeContent = (repoUrl) => async (dispatch) => {
  try {
    const response = await requestReadmeUrl(repoUrl)
    const readmeContentResponse = await requestUrl(response.data.download_url)
    dispatch(setReadmeContent(readmeContentResponse.data))
  } catch (err) {
    if (err.response.status === 404) {
      dispatch(setHasNoReadme('This repository doesn’t have a README.MD'))
    } else {
      dispatch(setErrorText(err.response.data.message))
    }
  }
}

export const onUserFormSubmit = (inputValue) => async (dispatch) => {
  if (inputValue.length === 0) {
    dispatch(setUsername(''))
    dispatch(setUsernameError('Please enter username'))
  } else {
    console.log('onUserFormSubmit', inputValue)
    dispatch(setUsername(inputValue))
    dispatch(getRepositories(inputValue))
  }
}

export const setRepoUrl = (repoUrl) => (dispatch) => {
  dispatch({ type: SET_REPO_URL, payload: repoUrl })
  dispatch(getReadmeContent(repoUrl))
}

export default userReducer
