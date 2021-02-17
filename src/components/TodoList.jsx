import React from 'react'
import Context from '../Store'

function TodoListItem({ title, completed, id }, i) {
  const {completeTodo, uncompleteTodo, deleteTodo} = React.useContext(Context)
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
        className={`focus:outline-none hover:text-green-800 cursor-pointer ${
          completed ? 'line-through' : ''
        }`}
      >
        {title}
      </button>
      {isHover && (
        <span>
          {!isHoverDelete && (
            <button onClick={onClickTodo}>{completed ? '🔼' : '✔'}</button>
          )}
          <button
            onMouseEnter={() => setIsHoverDelete(true)}
            onMouseLeave={() => setIsHoverDelete(false)}
            onClick={onClickDelete}
          >
            {isHoverDelete ? '❌' : '✖'}
          </button>
        </span>
      )}
    </li>
  )
}

export default function TodoList() {
  const context = React.useContext(Context)
  const completedTodos = context.todos.filter((todo) => todo.completed)
  const uncompletedTodos = context.todos.filter((todo) => !todo.completed)

  return (
    <>
      <ul className="bg-gradient-to-r from-yellow-50 to-yellow-200 py-2 px-4 shadow-xl rounded-xl">
        {uncompletedTodos.map((todo, i) => (
          <TodoListItem {...todo} key={i} />
        ))}
      </ul>
      <ul className="bg-white py-2 px-4 shadow-xl rounded-xl">
        {completedTodos.map((todo, i) => (
          <TodoListItem {...todo} key={i} />
        ))}
      </ul>
    </>
  )
}
