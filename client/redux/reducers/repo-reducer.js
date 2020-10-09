import { requestReadmeUrl, requestUrl } from '../../api/api'

const SET_README_CONTENT = 'github-browser/SET_README_CONTENT'
const SET_HAS_NO_README = 'github-browser/SET_HAS_NO_README'
const SET_ERROR_TEXT = 'github-browser/SET_ERROR_TEXT'
const RESET_REPO_STATE = 'github-browser/RESET_REPO_STATE'

const initialState = {
  readmeContent: null,
  hasNoReadme: null,
  errorText: null,
  repoUrl: null
}

export const setReadmeContent = (readmeContent) => {
  return { type: SET_README_CONTENT, payload: readmeContent }
}

export const setHasNoReadme = (hasNoReadme) => {
  return { type: SET_HAS_NO_README, payload: hasNoReadme }
}

export const setErrorText = (errorText) => {
  return { type: SET_ERROR_TEXT, payload: errorText }
}

export const resetRepoState = () => {
  return { type: RESET_REPO_STATE }
}

const repoReducer = (state = initialState, action) => {
  console.log('repoReducer', action)
  switch (action.type) {
    case SET_README_CONTENT: {
      return { ...state, readmeContent: action.payload }
    }
    case SET_HAS_NO_README: {
      return { ...state, hasNoReadme: action.payload }
    }
    case SET_ERROR_TEXT: {
      return { ...state, errorText: action.payload }
    }
    case RESET_REPO_STATE: {
      return { ...state, readmeContent: null, hasNoReadme: null, errorText: null }
    }
    default:
      return state
  }
}

export const getReadmeContent = (repoUrl) => async (dispatch) => {
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

export default repoReducer
