import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

const Repository = (props) => {
  const [readmeUrl, setReadmeUrl] = useState(null)
  const [readmeContent, setReadmeContent] = useState(null)
  const [getError, setGetError] = useState(null)
  const [errorText, setErrorText] = useState(null)

  useEffect(() => {
    const getReadmeUrl = async () => {
      try {
        const reqUrl = `${props.repoUrl}/readme`
        const response = await axios.get(reqUrl)
        setReadmeUrl(response.data.download_url)
      } catch (err) {
        setGetError(err.response.status)
      }
    }
    if (props.repoUrl) getReadmeUrl()
    setGetError(null)
  }, [props.repoUrl])

  useEffect(() => {
    const getReadmeContent = async () => {
      try {
        const response = await axios.get(readmeUrl)
        setReadmeContent(response.data)
      } catch (err) {
        setGetError(err.message)
      }
    }
    if (readmeUrl) getReadmeContent()
  }, [readmeUrl])

  useEffect(() => {
    if (getError === 404) setErrorText('This repository does not have a README.MD')
  }, [getError])

  return (
    <div>
      <div className="p-2">
        <b>Repository:</b> {props.repoUrl}
      </div>
      <div className="p-2">
        {getError ? (
          <div className="text-red-600 font-bold">{errorText}</div>
        ) : (
          readmeUrl && <ReactMarkdown source={readmeContent} />
        )}
      </div>
    </div>
  )
}

export default Repository
