import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

const Repositories = (props) => {
  const [reposArray, setReposArray] = useState([])
  const getRepositories = async () => {
    try {
      const response = await axios.get(props.url)
      setReposArray(response.data)
    } catch (err) {
      console.error('Error occured', err.message)
    }
  }

  useEffect(() => {
    if (props.url) getRepositories()
  }, [props.url])

  const urlList = reposArray.map((it) => {
    return (
      <div
        key={it.id}
        onClick={() => props.setRepoUrl(it.url)}
        onKeyDown={() => props.setRepoUrl(it.url)}
        tabIndex="0"
        role="link"
      >
        {it.name}
      </div>
    )
  })

  return (
    <div>
      {props.username && (
        <div className="p-3 font-semibold">{props.username}&apos;s repositories:</div>
      )}
      <div className="p-2">{urlList}</div>
    </div>
  )
}

export default Repositories
