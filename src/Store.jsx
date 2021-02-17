import React from 'react'

const Context = React.createContext({
  todos: [],
  completeTodo: (id) => {},
  uncompleteTodo: (id) => {},
  createTodo: (title) => {},
  deleteTodo: (id) => {},
})

function makeid(length) {
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const initialState = [
  {
    id: makeid(5),
    title: 'Koeraga jalutama',
    completed: false,
  },
  {
    id: makeid(5),
    title: 'Suusatama',
    completed: false,
  },
  {
    id: makeid(5),
    title: 'Poest piima',
    completed: true,
  },
]

export function ContextProvider({ children }) {
  const [todos, setTodos] = React.useState(initialState)

  const completeTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: true }
      }

      return todo
    })

    setTodos(updatedTodos)
  }

  const uncompleteTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: false }
      }

      return todo
    })

    setTodos(updatedTodos)
  }

  const createTodo = (title) => {
    const updatedTodos = [...todos]
    updatedTodos.push({ id: makeid(5), title, completed: false })

    setTodos(updatedTodos)
  }

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)

    setTodos(updatedTodos)
  }

  return (
    <Context.Provider
      value={{ todos, completeTodo, uncompleteTodo, createTodo, deleteTodo }}
    >
      {children}
    </Context.Provider>
  )
}

export default Context