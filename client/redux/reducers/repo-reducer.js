const SET_README_URL = 'github-browser/SET_README_URL'
const SET_README_CONTENT = 'github-browser/SET_README_CONTENT'
const SET_HAS_NO_README = 'github-browser/SET_HAS_NO_README'
const SET_ERROR_TEXT = 'github-browser/SET_ERROR_TEXT'

const initialState = {
  readmeUrl: null,
  readmeContent: null,
  hasNoReadme: null,
  errorText: null,
}

const repoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_README_URL: {
      return { ...state, readmeUrl: action.payload }
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

// const [errorText, setErrorText] = useState(null)
// const [readmeUrl, setReadmeUrl] = useState(null)
// const [readmeContent, setReadmeContent] = useState(null)
// const [hasNoReadme, setHasNoReadme] = useState(null)

export const setReadmeUrl = (readmeUrl) => {
  return { type: SET_README_URL, payload: readmeUrl }
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

export default repoReducer
