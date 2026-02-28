import { Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import TaskPage from './components/TaskPage'

function App () {
  return (
    <div className = "app"> 
      <Routes>
        <Route path = "/" element = {<Dashboard />} />
        <Route path = "/task/:taskId" element = {<TaskPage />}/>
      </Routes>  
    </div>
  )
}

export default App
