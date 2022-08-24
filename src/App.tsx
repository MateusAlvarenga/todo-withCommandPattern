import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import TodoComponent from './components/TodoComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h3>Todo app</h3>
      <div className="card">
        <TodoComponent></TodoComponent>
      </div>
    </div>
  )
}

export default App
