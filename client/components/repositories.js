import React from 'react'

const Repositories = (props) => {
  const urlList = props.reposArray.map((it) => {
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
      {props.reposError && <div className="text-red-600 font-bold">{props.reposError}</div>}
      {props.reposArray.length !== 0 && (
        <div className="p-3 font-semibold">{props.username}&apos;s repositories:</div>
      )}
      <div className="p-2">{urlList}</div>
    </div>
  )
}

export default Repositories
