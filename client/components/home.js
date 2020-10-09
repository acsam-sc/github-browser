import React, { useEffect } from 'react'
import { connect } from 'react-redux'
// import { Route } from 'react-router-dom'
import Head from './head'
import Main from './main'
import Repositories from './repositories'
import Repository from './repository'
import { setRepoUrl, getRepositories, onUserFormSubmit } from '../redux/reducers/user-reducer'
import { resetRepoState, getReadmeContent } from '../redux/reducers/repo-reducer'

const Home = (props) => {
  console.log('Home props', props)

  useEffect(() => {
    if (props.username.length > 0) props.getRepositories(props.username)
  }, [props.username])

  useEffect(() => {
    props.resetRepoState()
    if (props.repoUrl) props.getReadmeContent(props.repoUrl)
  }, [props.repoUrl])


  return (
    <div className="flex flex-row w-full min-h-full">
      <Head title="Hello" />
      <div className="flex flex-col h-screen w-1/3">
        <div className="flex w-full h-48 border-2 border-black">
          <Main
            onUserFormSubmit={props.onUserFormSubmit}
            usernameError={props.usernameError}
            username={props.username}
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
    readmeContent: state.repoReducer.readmeContent,
    hasNoReadme: state.repoReducer.hasNoReadme,
    errorText: state.repoReducer.errorText
  }
}

const mapDispatchToProps = {
  setRepoUrl,
  resetRepoState,
  getRepositories,
  onUserFormSubmit,
  getReadmeContent
}

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Home))
