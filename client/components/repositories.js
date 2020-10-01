import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

const Repositories = (props) => {

  const [reposArray, setReposArray] = useState([])

  const getRepositories = async () => {
    const response = await axios.get(props.url)
    setReposArray(response.data)
    console.log('getRepositories', response.data)
  }

  useEffect(() => {
    if (props.url) getRepositories(props.url)
  }, [props.url]) 

  const urlList = reposArray.map(it => {
    // return <li key={it.id}><Link to={it.url}>{it.name}</Link></li>
  return <li key={it.id}>{it.name}</li>
  })

  return <div>
    {props.username && <div className="p-3 font-semibold">{props.username}&apos;s repositories:</div>}
    <ul className="p-2">
      { urlList }
    </ul>
  </div>
}

export default Repositories