import { BrowserRouter, Route, Routes } from "react-router-dom"
import CreateTaskPage from "./pages/CreateTaskPage/CreateTaskPage"
import TodosPage from "./pages/TodosPage/TodosPage"
import EditTaskPage from "./pages/EditTaskPage/EditTaskPage"
import "./App.scss"
import NavbarContainer from "./containers/NavbarContainer/NavbarContainer"
import CreateCategoryPage from "./pages/CreateCategory/CreateCategoryPage"

function App() {

  return (
    <>
      <BrowserRouter>
        <NavbarContainer />
        <Routes>
          <Route path='/' element={<TodosPage />} />
          <Route path="/todos/new" element={<CreateTaskPage />}/>
          <Route path="/todos/:id/edit" element={<EditTaskPage />}/>
          <Route path="/categories" element={<CreateCategoryPage />}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
