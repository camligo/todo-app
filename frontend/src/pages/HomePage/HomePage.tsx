import { useEffect, useState } from "react"
import { createTask, deleteTaskById, getAllTasks, TaskResponse } from "../../services/task-services"
import Task from "../../components/Task/Task"
import TaskForm from "../../components/TaskForm/TaskForm"
import { TaskFormData } from "../../components/TaskForm/schema"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const [tasks, setTasks] = useState<TaskResponse[]>([])

  useEffect(() => {
    getAllTasks()
      .then(data => setTasks(data))
      .catch((e) => console.log(e));
  }, [])

  const deleteTask = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this task?");
    if(!confirmed) {
      return;
    }
    const isDeleted = await deleteTaskById(id).catch((e) => {
      console.log(e);
      return false;
    });
    if(isDeleted) {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
    }
  }

  const onSubmit = async (data: TaskFormData) => {
    const navigate = useNavigate();
    createTask(data).then(() => navigate('/'));
  };

  return (
    <>
      <h1>Todo App</h1>
      {tasks.map((task) => (
        <Task task={task} onDelete={deleteTask} key={task.id}/>
      ))}
      <TaskForm onSubmit={onSubmit}/>
    </>
  )
}

export default HomePage
