import React from 'react'
import { connect } from 'react-redux'
import Head from './head'
import Main from './main'
import Repositories from './repositories'
import Repository from './repository'
import { setRepoName, onUserFormSubmit, setUsername } from '../redux/reducers/user-reducer'

const Home = (props) => {
  return (
    <div className="flex flex-row w-full min-h-full">
      <Head title="Hello" />
      <div className="flex flex-col h-screen w-1/3">
        <div className="flex w-full h-48 border-2 border-black">
          <Main
            onUserFormSubmit={props.onUserFormSubmit}
            usernameError={props.usernameError}
            username={props.username}
            setUsername={props.setUsername}
          />
        </div>
        <div className="flex w-full flex-grow border-2 border-black">
          <Repositories
            reposArray={props.reposArray}
            username={props.username}
            setRepoName={props.setRepoName}
            reposError={props.reposError}
            repoName={props.repoName}
          />
        </div>
      </div>
      <div className="w-full">
        <Repository
          username={props.username}
          repoName={props.repoName}
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
  return {
    username: state.userReducer.username,
    repoName: state.userReducer.repoName,
    usernameError: state.userReducer.usernameError,
    reposArray: state.userReducer.reposArray,
    reposError: state.userReducer.reposError,
    readmeContent: state.userReducer.readmeContent,
    hasNoReadme: state.userReducer.hasNoReadme,
    errorText: state.userReducer.errorText
  }
}

const mapDispatchToProps = {
  setRepoName,
  onUserFormSubmit,
  setUsername
}

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Home))
