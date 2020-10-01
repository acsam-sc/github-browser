import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

const Repository = ({ errorText, setErrorText, repoUrl }) => {
  const [readmeUrl, setReadmeUrl] = useState(null)
  const [readmeContent, setReadmeContent] = useState(null)
  const [hasNoReadme, setHasNoReadme] = useState(null)

  useEffect(() => {
    setErrorText(null)
    setReadmeUrl(null)
    setReadmeContent(null)
    setHasNoReadme(null)
    const getReadmeUrl = async () => {
      try {
        const response = await axios.get(`${repoUrl}/readme`)
        setReadmeUrl(response.data.download_url)
      } catch (err) {
        if (err.response.status === 404) {
          setHasNoReadme('This repository does not have a README.MD')
        } else {
          setErrorText(err.response.data.message)
        }
      }
    }
    if (repoUrl) getReadmeUrl()
  }, [repoUrl])

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
    <div>
      {errorText && (
        <div className="p-2">
          <div className="text-red-600 font-bold p-2">{errorText}</div>
        </div>
      )}
      {hasNoReadme && (
        <div className="p-2">
          <b>Repository:</b> {repoUrl}
          <div className="text-red-600 font-bold p-2">{hasNoReadme}</div>
        </div>
      )}
      {readmeUrl && (
        <div className="p-2">
          <b>Repository:</b> {repoUrl}
          <div className="p-2">
            <ReactMarkdown source={readmeContent} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Repository
