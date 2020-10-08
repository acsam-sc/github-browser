import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
// import { Route } from 'react-router-dom'
import Head from './head'
import Main from './main'
import Repositories from './repositories'
import Repository from './repository'
import { setUsername, setRepoUrl, setUsernameError, setReposArray, setReposError } from '../redux/reducers/user-reducer'
import { setReadmeUrl, setReadmeContent, setHasNoReadme, setErrorText } from '../redux/reducers/repo-reducer'

const Home = (props) => {
  console.log('Home props', props)

  const resetUsernameState = () => {
    props.setRepoUrl(null)
    props.setUsernameError(null)
    props.setReposArray([])
    props.setReposError(null)
  }

  const resetRepoState = () => {
    props.setErrorText(null)
    props.setReadmeUrl(null)
    props.setReadmeContent(null)
    props.setHasNoReadme(null)
  }

  useEffect(() => {
    resetUsernameState()
    const url = props.username ? `https://api.github.com/users/${props.username}/repos` : null
    const getRepositories = async () => {
      try {
        const response = await axios.get(url)
        // setErrorText(response.data[0].url)
        if (response.data.length === 0) {
          props.setReposError(`${props.username} doesn’t have any public repositories yet`)
        } else {
          props.setReposArray(response.data)
        }
      } catch (err) {
        // console.log(err.response.data.message)
        if (err.response.status === 404) {
          props.setUsernameError('No such user')
        } else {
          props.setErrorText(err.response.data.message)
        }
      }
    }
    if (url) getRepositories()
  }, [props.username])

  useEffect(() => {
    resetRepoState()
    const getReadmeUrl = async () => {
      try {
        const response = await axios.get(`${props.repoUrl}/readme`)
        props.setReadmeUrl(response.data.download_url)
      } catch (err) {
        if (err.response.status === 404) {
          props.setHasNoReadme('This repository doesn’t have a README.MD')
        } else {
          props.setErrorText(err.response.data.message)
        }
      }
    }
    if (props.repoUrl) getReadmeUrl()
  }, [props.repoUrl])

  useEffect(() => {
    const getReadmeContent = async () => {
      try {
        const response = await axios.get(props.readmeUrl)
        props.setReadmeContent(response.data)
      } catch (err) {
        props.setErrorText(err.response.data.message)
      }
    }
    if (props.readmeUrl) getReadmeContent()
  }, [props.readmeUrl])

  return (
    <div className="flex flex-row w-full min-h-full">
      <Head title="Hello" />
      <div className="flex flex-col h-screen w-1/3">
        <div className="flex w-full h-48 border-2 border-black">
          <Main
            setUsername={props.setUsername}
            setUsernameError={props.setUsernameError}
            usernameError={props.usernameError}
          />
        </div>
        <div className="flex w-full flex-grow border-2 border-black">
          <Repositories
            reposArray={props.reposArray}
            username={props.username}
            setRepoUrl={props.setRepoUrl}
            reposError={props.reposError}
          />
        </div>
      </div>
      <div className="w-full">
        <Repository
          repoUrl={props.repoUrl}
          errorText={props.errorText}
          hasNoReadme={props.hasNoReadme}
          readmeContent={props.readmeContent}
          readmeUrl={props.readmeUrl}
        />
      </div>
    </div>
  )
}

Home.propTypes = {}

const mapStateToProps = (state) => {
  // console.log('state', state)
  return {
    username: state.userReducer.username,
    repoUrl: state.userReducer.repoUrl,
    usernameError: state.userReducer.usernameError,
    reposArray: state.userReducer.reposArray,
    reposError: state.userReducer.reposError,
    readmeUrl: state.repoReducer.readmeUrl,
    readmeContent: state.repoReducer.readmeContent,
    hasNoReadme: state.repoReducer.hasNoReadme,
    errorText: state.repoReducer.errorText
  }
}

const mapDispatchToProps = {
  setUsername,
  setRepoUrl,
  setUsernameError,
  setReposArray,
  setReposError,
  setReadmeUrl,
  setReadmeContent,
  setHasNoReadme,
  setErrorText
}

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Home))
