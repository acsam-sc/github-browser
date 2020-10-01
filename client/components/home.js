import React, { useState } from 'react'
// import { Route } from 'react-router-dom'
import Head from './head'
import Main from './main'
import Repositories from './repositories'
import Repository from './repository'

const Home = () => {
  const [username, setUsername] = useState(null)
  const [repoUrl, setRepoUrl] = useState(null)
  const url = username ? `https://api.github.com/users/${username}/repos` : null

  return (
    <div className="flex flex-row w-full min-h-full">
      <Head title="Hello" />
      <div className="flex flex-col h-screen w-1/3">
        <div className="flex w-full h-48 border-2 border-black">
          <Main setUsername={setUsername} />
        </div>
        <div className="flex w-full flex-grow border-2 border-black">
          <Repositories url={url} username={username} setRepoUrl={setRepoUrl} />
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
