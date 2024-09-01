import { BrowserRouter, Route, Routes } from "react-router-dom"
import CreateTaskPage from "./pages/CreateTaskPage/CreateTaskPage"
import TodosPage from "./pages/TodosPage/TodosPage"
import EditTaskPage from "./pages/EditTaskPage/EditTaskPage"
import ArchivedTasksPage from "./pages/ArchivedTasksPage/ArchivedTasksPage"
import "./App.scss"
import Navbar from "./components/Navbar/Navbar"

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<TodosPage />} />
          <Route path="/todos/new" element={<CreateTaskPage />}/>
          <Route path="/todos/:id/edit" element={<EditTaskPage />}/>
          <Route path="/todos/archive" element={<ArchivedTasksPage />}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
