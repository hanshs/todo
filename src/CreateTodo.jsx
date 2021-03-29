import React from 'react'
import useStore from './store'

export default function CreateTodo() {
  const createTodo = useStore(state => state.createTodo)
  const [isCreate, setIsCreate] = React.useState(false)
  const [title, setTitle] = React.useState('')

  const onCreate = (e) => {
    e.preventDefault()
    createTodo(title)
    setTitle('')
    setIsCreate(false)
  }

  if (isCreate) {
    return (
      <form onSubmit={onCreate}>
        <input
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          onBlur={() => setIsCreate(false)}
          className="bg-white-200 rounded-xl py-2 px-4 w-full"
        />
      </form>
    )
  }

  return (
    <button
      onClick={() => setIsCreate(true)}
      className="font-bold text-indigo-900 hover:text-indigo-700 bg-green-200 rounded-xl py-2 px-4 w-full"
    >
      Create Todo
    </button>
  )
}
