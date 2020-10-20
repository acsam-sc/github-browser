import React from 'react'
import ReactMarkdown from 'react-markdown'

const Repository = ({ errorText, hasNoReadme, repoUrl, readmeContent }) => {
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
      {readmeContent && (
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

export default React.memo(Repository)
