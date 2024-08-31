import { BrowserRouter, Route, Routes } from "react-router-dom"
import TasksPage from "./pages/TasksPage/TasksPage"
import CreateTaskPage from "./pages/CreateTaskPage/CreateTaskPage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TasksPage />} />
          <Route path="/todos/new" element={<CreateTaskPage />}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
