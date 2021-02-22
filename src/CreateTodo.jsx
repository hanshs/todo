import React from 'react'
import Context from './Store'

export default function CreateTodo() {
  const { createTodo } = React.useContext(Context)
  const [isCreate, setIsCreate] = React.useState(false)
  const [title, setTitle] = React.useState('')

  const onCreate = (e) => {
    e.preventDefault()
    createTodo(title)
    setTitle('')
    setIsCreate(false)
  }

  const handleInputChange = (e) => {
    setTitle(e.target.value)
  }

  const handleBlur = () => {
    setIsCreate(false)
  }

  const handleClick = () => {
    setIsCreate(true)
  }

  if (isCreate) {
    return (
      <form onSubmit={onCreate}>
        <input
          autoFocus
          onChange={handleInputChange}
          value={title}
          onBlur={handleBlur}
          className="bg-white-200 rounded-xl py-2 px-4 w-full"
        />
      </form>
    )
  }

  return (
    <button
      onClick={handleClick}
      className="font-bold text-indigo-900 hover:text-indigo-700 bg-green-200 rounded-xl py-2 px-4 w-full"
    >
      Create Todo
    </button>
  )
}
