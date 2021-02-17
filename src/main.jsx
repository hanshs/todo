import React from 'react'
import ReactDOM from 'react-dom'

import { ContextProvider } from './Store'
import TodoList from './components/TodoList'
import CreateTodo from './components/CreateTodo'

import './static/index.css'

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <div className="h-screen bg-indigo-900 flex flex-col items-center justify-center">
        <div className="w-80 space-y-2 text-2xl">
          <CreateTodo />
          <TodoList />
        </div>
      </div>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
