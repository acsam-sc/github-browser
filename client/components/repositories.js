import React from 'react'

const Repositories = ({ setRepoUrl, username, reposError, reposArray }) => {
  const urlList = reposArray.map((it) => {
    return (
      <div
        key={it.id}
        onClick={() => setRepoUrl(it.url)}
        onKeyDown={() => setRepoUrl(it.url)}
        tabIndex="0"
        role="link"
      >
        {it.name}
      </div>
    )
  })

  return (
    <div>
      {reposError && <div className="text-red-600 font-bold">{reposError}</div>}
      {reposArray.length !== 0 && (
        <div className="p-3 font-semibold">{username}&#39;s repositories:</div>
      )}
      <div className="p-2">{urlList}</div>
    </div>
  )
}

export default Repositories
