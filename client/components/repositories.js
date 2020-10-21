import React from 'react'

const Repositories = ({ setRepoName, username, repoName, reposError, reposArray }) => {
  const urlList = reposArray.map((it) => {
    return (
      <div
        className={it.name === repoName ? 'cursor-pointer font-bold' : 'cursor-pointer'}
        key={it.id}
        onClick={() => setRepoName(username, it.name)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setRepoName(username, it.name)
        }}
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

export default React.memo(Repositories)
