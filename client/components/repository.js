import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

const Repository = ({ repoUrl }) => {
  const [readmeUrl, setReadmeUrl] = useState(null)
  const [readmeContent, setReadmeContent] = useState(null)
  const [errorText, setErrorText] = useState(null)

  useEffect(() => {
    setErrorText(null)
    setReadmeContent(null)
    const getReadmeUrl = async () => {
      try {
        const response = await axios.get(`${repoUrl}/readme`)
        setReadmeUrl(response.data.download_url)
      } catch (err) {
        if (err.response.status === 404) {
          setErrorText('This repository does not have a README.MD')
        } else {
          setErrorText(err.message)
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
        setErrorText(err.message)
      }
    }
    if (readmeUrl) getReadmeContent()
  }, [readmeUrl])

  return (
    <div>
      <div className="p-2">
        <b>Repository:</b> {repoUrl}
      </div>
      <div className="p-2">
        {errorText ? (
          <div className="text-red-600 font-bold">{errorText}</div>
        ) : (
          readmeUrl && <ReactMarkdown source={readmeContent} />
        )}
      </div>
    </div>
  )
}

export default Repository
