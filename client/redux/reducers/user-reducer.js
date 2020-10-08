const SET_USERNAME = 'github-browser/SET_USERNAME'
const SET_USERNAME_ERROR = 'github-browser/SET_USERNAME_ERROR'
const SET_REPO_URL = 'github-browser/SET_SET_REPO_URL'
const SET_REPOS_ARRAY = 'github-browser/SET_REPOS_ARRAY'
const SET_REPOS_ERROR = 'github-browser/SET_REPOS_ERROR'

const initialState = {
  username: null,
  usernameError: null,
  repoUrl: null,
  reposArray: [],
  reposError: null
}

const userReducer = (state = initialState, action) => {
  // console.log('userReducer', state, action)
  switch (action.type) {
    case SET_USERNAME: {
      return { ...state, username: action.payload }
    }
    case SET_USERNAME_ERROR: {
      return { ...state, usernameError: action.payload }
    }
    case SET_REPO_URL: {
      return { ...state, repoUrl: action.payload }
    }
    case SET_REPOS_ARRAY: {
      return { ...state, reposArray: action.payload }
    }
    case SET_REPOS_ERROR: {
      return { ...state, reposError: action.payload }
    }
    default:
      return state
  }
}

// const [username, setUsername] = useState(null)
// const [repoUrl, setRepoUrl] = useState(null)
// const [usernameError, setUsernameError] = useState(null)
// const [reposArray, setReposArray] = useState([])
// const [reposError, setReposError] = useState(null)
// const [errorText, setErrorText] = useState(null)
// const [readmeUrl, setReadmeUrl] = useState(null)
// const [readmeContent, setReadmeContent] = useState(null)
// const [hasNoReadme, setHasNoReadme] = useState(null)

// export const resetUsernameState = () => {
//   setRepoUrl(null)
//   setUsernameError(null)
//   setReposArray([])
//   setReposError(null)
// }

export const setUsername = (username) => {
  // console.log('setUsernameAC', username)
  return { type: SET_USERNAME, payload: username }
}

export const setRepoUrl = (repoUrl) => {
  return { type: SET_REPO_URL, payload: repoUrl }
}

export const setUsernameError = (usernameError) => {
  return { type: SET_USERNAME_ERROR, payload: usernameError }
}

export const setReposArray = (reposArray) => {
  return { type: SET_REPOS_ARRAY, payload: reposArray }
}

export const setReposError = (reposError) => {
  return { type: SET_REPOS_ERROR, payload: reposError }
}

export default userReducer
