import React from 'react'
import Confetti from 'react-confetti'
import useStore from './store'

function TodoListItem({ title, completed, completionDate, id, onComplete }, i) {
  const uncompleteTodo = useStore(state => state.uncompleteTodo)
  const completeTodo = useStore(state => state.completeTodo)
  const deleteTodo = useStore(state => state.deleteTodo)
  const [isHover, setIsHover] = React.useState(false)
  const [isHoverDelete, setIsHoverDelete] = React.useState(false)


  const onClickTodo = () => {
    if (completed) {
      uncompleteTodo(id)
    } else {
      completeTodo(id)
      onComplete()
    }
  }

  return (
    <li
      key={i}
      className={`flex justify-between ${!completed && 'hover:underline'}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <button
        onClick={onClickTodo}
        className={`focus:outline-none ${!completed && 'hover:text-green-800'} focus:text-green-500 cursor-pointer text-left`}
        title={`Mark as ${completed ? 'todo' : 'done'}`}
      >
        <span className={`${completed ? 'line-through' : ''}`}>{title}</span>
        {completed && <span className="text-gray-400 text-decoration-none text-sm ml-2">{completionDate}</span>}
      </button>
      {isHover && completed && (
        <span>
          <button
            onMouseEnter={() => setIsHoverDelete(true)}
            onMouseLeave={() => setIsHoverDelete(false)}
            onClick={() => deleteTodo(id)}
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
  const todos = useStore(state => state.todos)
  const [celebrate, setCelebrate] = React.useState(false)

  const completedTodos = todos.filter((todo) => todo.completed)
  const uncompletedTodos = todos.filter((todo) => !todo.completed)

  const onComplete = () => {
    setCelebrate(true)
    setTimeout(() => {
      setCelebrate(false)
    }, 2000);
  }

  if (!todos.length) {
    return null
  }

  return (
    <>
      {<Confetti numberOfPieces={celebrate ? 200 : 0} />}
      <ul className="bg-gradient-to-r from-yellow-50 to-yellow-200 pb-2 px-4 shadow-xl rounded-xl">
        <span className="text-xs text-gray-600">TODO</span>
        {uncompletedTodos.map((todo, i) => <TodoListItem {...todo} key={i} onComplete={onComplete} />)}
      </ul>

      <ul className="bg-white pb-2 px-4 shadow-xl rounded-xl">
        <span className="text-xs text-gray-600">DONE</span>
        {completedTodos.map((todo, i) => <TodoListItem {...todo} key={i} />)}
      </ul>
    </>
  )
}
