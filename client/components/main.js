import React, { useState } from 'react'

const Main = ({ username, onUserFormSubmit, usernameError }) => {
  const [inputValue, setInputValue] = useState('')
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (
      (usernameError !== 'Please enter username' && inputValue.length === 0) ||
      inputValue !== username
    ) {
      onUserFormSubmit(inputValue)
    }
  }

  return (
    <div className="m-10">
      Welcome to GitHub README&#39;s Browser
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

export default React.memo(Main)
