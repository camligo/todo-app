import { useEffect } from "react"
import { getAllTasks } from "./services/task-services"

function App() {
  useEffect(() => {
    getAllTasks().then(console.log).catch(console.error)
  }, [])
  return (
    <>
      <h1>Todo App</h1>
    </>
  )
}

export default App
