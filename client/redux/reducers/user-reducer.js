import { requestRepos } from '../../api/api'

const SET_USERNAME = 'github-browser/SET_USERNAME'
const SET_REPO_URL = 'github-browser/SET_REPO_URL'
const SET_USERNAME_ERROR = 'github-browser/SET_USERNAME_ERROR'
const SET_REPOS_ARRAY = 'github-browser/SET_REPOS_ARRAY'
const SET_REPOS_ERROR = 'github-browser/SET_REPOS_ERROR'
const SET_ERROR_TEXT = 'github-browser/SET_ERROR_TEXT'

const initialState = {
  username: '',
  usernameError: null,
  repoUrl: null,
  reposArray: [],
  reposError: null
}

export const setUsername = (username) => ({ type: SET_USERNAME, payload: username })

export const setUsernameError = (usernameError) => {
  return { type: SET_USERNAME_ERROR, payload: usernameError }
}

export const setRepoUrl = (repoUrl) => {
  return { type: SET_REPO_URL, payload: repoUrl }
}

export const setReposArray = (reposArray) => {
  return { type: SET_REPOS_ARRAY, payload: reposArray }
}

export const setReposError = (reposError) => {
  return { type: SET_REPOS_ERROR, payload: reposError }
}

export const setErrorText = (errorText) => {
  return { type: SET_ERROR_TEXT, payload: errorText }
}

const userReducer = (state = initialState, action) => {
  console.log('userReducer', state, action)
  switch (action.type) {
    case SET_USERNAME: {
      return { ...state,
        repoUrl: null,
        usernameError: null,
        reposArray: [],
        reposError: null,
        username: action.payload
      }
    }
    case SET_REPO_URL: {
      return { ...state, repoUrl: action.payload }
    }
    case SET_USERNAME_ERROR: {
      return { ...state, usernameError: action.payload }
    }
    case SET_REPOS_ARRAY: {
      return { ...state, reposArray: action.payload }
    }
    case SET_REPOS_ERROR: {
      return { ...state, reposError: action.payload }
    }
    case SET_ERROR_TEXT: {
      return { ...state, errorText: action.payload }
    }
    default:
      return state
  }
}

export const getRepositories = (username) => async (dispatch) => {
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

export const onUserFormSubmit = (inputValue) => (dispatch) => {
  if (inputValue.length === 0) {
    dispatch(setUsername(''))
    dispatch(setUsernameError('Please enter username'))
  // } else if (inputValue !== username) dispatch(setUsername(inputValue))
  } else dispatch(setUsername(inputValue))
} 

export default userReducer
