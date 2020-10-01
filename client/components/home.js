import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Route } from 'react-router-dom'
import Head from './head'
import Main from './main'
import Repositories from './repositories'
import Repository from './repository'

const Home = () => {
  const [username, setUsername] = useState(null)
  const [repoUrl, setRepoUrl] = useState(null)
  const [usernameError, setUsernameError] = useState(null)
  const [reposArray, setReposArray] = useState([])

  const onSetUsername = (input) => {
    setRepoUrl(null)
    setUsernameError(null)
    setReposArray([])
    setUsername(input)
  }

  useEffect(() => {
    const url = username ? `https://api.github.com/users/${username}/repos` : null
    const getRepositories = async () => {
      try {
        const response = await axios.get(url)
        setReposArray(response.data)
      } catch (err) {
        if (err.response.status === 404) {
          setUsernameError('No such user')
        } else {
          setUsernameError(err.message)
        }
      }
    }
    if (url) getRepositories()
  }, [username])

  return (
    <div className="flex flex-row w-full min-h-full">
      <Head title="Hello" />
      <div className="flex flex-col h-screen w-1/3">
        <div className="flex w-full h-48 border-2 border-black">
          <Main onSetUsername={onSetUsername} usernameError={usernameError} />
        </div>
        <div className="flex w-full flex-grow border-2 border-black">
          <Repositories
            reposArray={reposArray}
            username={username}
            setRepoUrl={setRepoUrl}
            usernameError={usernameError}
          />
        </div>
      </div>
      <div className="w-full">
        <Repository repoUrl={repoUrl} />
      </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
