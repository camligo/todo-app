import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <>
      <Link to={"/"}>Home</Link>
      <Link to={"/todos/new"}>Add New Task</Link>
      <Link to={"/todos/archive"}>Archive</Link>
    </>
  )
}

export default Navbar
