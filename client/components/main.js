import React, { useState } from 'react'

const Main = ({ setUsername, setUsernameError, usernameError }) => {
  const [inputValue, setInputValue] = useState('')
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (inputValue.length === 0) {
      setUsernameError('Please enter username')
    } else setUsername(inputValue)
  }

  return (
    <div className="m-10">
      Welcome to GitHub Browser
      <div>
        <form onSubmit={onSubmit}>
          <input
            className="border-2 border-black"
            placeholder="Enter Github username"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button className="bg-gray-500 m-1" type="submit">
            Search
          </button>
          {usernameError && <div className="text-red-600 font-bold">{usernameError}</div>}
        </form>
      </div>
    </div>
  )
}

export default Main
