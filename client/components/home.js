import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
// import { Route } from 'react-router-dom'
import Head from './head'
import Main from './main'
import Repositories from './repositories'
import Repository from './repository'
import { setUsername, setRepoUrl } from '../redux/reducers/user-reducer'

const Home = (props) => {
  console.log('Home props', props)
  const [usernameError, setUsernameError] = useState(null)
  const [reposArray, setReposArray] = useState([])
  const [reposError, setReposError] = useState(null)
  const [errorText, setErrorText] = useState(null)
  const [readmeUrl, setReadmeUrl] = useState(null)
  const [readmeContent, setReadmeContent] = useState(null)
  const [hasNoReadme, setHasNoReadme] = useState(null)

  const resetUsernameState = () => {
    setRepoUrl(null)
    setUsernameError(null)
    setReposArray([])
    setReposError(null)
  }

  const resetRepoState = () => {
    setErrorText(null)
    setReadmeUrl(null)
    setReadmeContent(null)
    setHasNoReadme(null)
  }

  useEffect(() => {
    resetUsernameState()
    const url = props.username ? `https://api.github.com/users/${props.username}/repos` : null
    const getRepositories = async () => {
      try {
        const response = await axios.get(url)
        // setErrorText(response.data[0].url)
        if (response.data.length === 0) {
          setReposError(`${props.username} doesn’t have any public repositories yet`)
        } else {
          setReposArray(response.data)
        }
      } catch (err) {
        // console.log(err.response.data.message)
        if (err.response.status === 404) {
          setUsernameError('No such user')
        } else {
          setErrorText(err.response.data.message)
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
        setReadmeUrl(response.data.download_url)
      } catch (err) {
        if (err.response.status === 404) {
          setHasNoReadme('This repository doesn’t have a README.MD')
        } else {
          setErrorText(err.response.data.message)
        }
      }
    }
    if (props.repoUrl) getReadmeUrl()
  }, [props.repoUrl])

  useEffect(() => {
    const getReadmeContent = async () => {
      try {
        const response = await axios.get(readmeUrl)
        setReadmeContent(response.data)
      } catch (err) {
        setErrorText(err.response.data.message)
      }
    }
    if (readmeUrl) getReadmeContent()
  }, [readmeUrl])

  return (
    <div className="flex flex-row w-full min-h-full">
      <Head title="Hello" />
      <div className="flex flex-col h-screen w-1/3">
        <div className="flex w-full h-48 border-2 border-black">
          <Main
            setUsername={props.setUsername}
            setUsernameError={setUsernameError}
            usernameError={usernameError}
          />
        </div>
        <div className="flex w-full flex-grow border-2 border-black">
          <Repositories
            reposArray={reposArray}
            username={props.username}
            setRepoUrl={props.setRepoUrl}
            reposError={reposError}
          />
        </div>
      </div>
      <div className="w-full">
        <Repository
          repoUrl={props.repoUrl}
          errorText={errorText}
          hasNoReadme={hasNoReadme}
          readmeContent={readmeContent}
          readmeUrl={readmeUrl}
        />
      </div>
    </div>
  )
}

Home.propTypes = {}

const mapStateToProps = (state) => {
  // console.log('state', state)
  return ({
    username: state.userReducer.username,
    repoUrl: state.userReducer.repoUrl
  })
}

const mapDispatchToProps = {
  setUsername,
  setRepoUrl
}

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Home))
