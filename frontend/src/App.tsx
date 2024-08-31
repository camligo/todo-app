import { BrowserRouter, Route, Routes } from "react-router-dom"
import CreateTaskPage from "./pages/CreateTaskPage/CreateTaskPage"
import TodosPage from "./pages/TodosPage/TodosPage"
import EditTaskPage from "./pages/EditTaskPage/EditTaskPage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TodosPage />} />
          <Route path="/todos/new" element={<CreateTaskPage />}/>
          <Route path="/todos/:id/edit" element={<EditTaskPage />}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
