import { useState } from 'react'
import TodoApp         from './components/Todo/TodoApp.jsx'
import Forms           from './components/Forms/UserForm.jsx'
import Progress        from './components/Progress/MultiProgressBar.jsx'
import Timer           from './components/Timer/CountDownTimer.jsx'
import Search          from './components/Search/SearchList.jsx'

import './App.css'

function App() {

  return (
    <>
      <TodoApp />
      <Forms />
      <Progress />
      <Timer />
      <Search />
    </>
  )
}

export default App
