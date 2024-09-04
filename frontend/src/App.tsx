import { BrowserRouter, Route, Routes } from "react-router-dom"
import CreateTaskPage from "./pages/CreateTaskOrCategoryPage/CreateTaskOrCategoryPage"
import TodosPage from "./pages/TodosPage/TodosPage"
import EditTaskPage from "./pages/EditTaskPage/EditTaskPage"
import ArchivedTasksPage from "./pages/ArchivedTasksPage/ArchivedTasksPage"
import "./App.scss"
import NavbarContainer from "./containers/NavbarContainer/NavbarContainer"

function App() {

  return (
    <>
      <BrowserRouter>
        <NavbarContainer />
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
