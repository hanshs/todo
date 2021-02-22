import React from 'react'
import Context from './Store'

function TodoListItem({ title, completed, id }, i) {
  const { completeTodo, uncompleteTodo, deleteTodo } = React.useContext(Context)
  const [isHover, setIsHover] = React.useState(false)
  const [isHoverDelete, setIsHoverDelete] = React.useState(false)

  const onClickTodo = () => {
    if (completed) {
      uncompleteTodo(id)
    } else {
      completeTodo(id)
    }
  }

  const onClickDelete = () => {
    deleteTodo(id)
  }

  return (
    <li
      key={i}
      className="flex justify-between hover:underline"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <button
        onClick={onClickTodo}
        className={`focus:outline-none focus:text-green-500 hover:text-green-800 cursor-pointer text-left ${
          completed ? 'line-through' : ''
        }`}
        title={`Mark as ${completed ? 'todo' : 'completed'}`}
      >
        {title}
      </button>
      {isHover && completed && (
        <span>
          <button
            onMouseEnter={() => setIsHoverDelete(true)}
            onMouseLeave={() => setIsHoverDelete(false)}
            onClick={onClickDelete}
            title="Delete"
          >
            {isHoverDelete ? '❌' : '✖'}
          </button>
        </span>
      )}
    </li>
  )
}

export default function TodoList() {
  const { todos } = React.useContext(Context)
  const completedTodos = todos.filter((todo) => todo.completed)
  const uncompletedTodos = todos.filter((todo) => !todo.completed)

  if (!todos.length) {
    return null
  }

  return (
    <>
      <ul className="bg-gradient-to-r from-yellow-50 to-yellow-200 pb-2 px-4 shadow-xl rounded-xl">
        <span className="text-xs text-gray-600">TODO</span>
        {uncompletedTodos.map((todo, i) => (
          <TodoListItem {...todo} key={i} />
        ))}
      </ul>

      <ul className="bg-white pb-2 px-4 shadow-xl rounded-xl">
        <span className="text-xs text-gray-600">DONE</span>
        {completedTodos.map((todo, i) => (
          <TodoListItem {...todo} key={i} />
        ))}
      </ul>
    </>
  )
}
