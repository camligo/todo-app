import { useEffect, useState } from "react";
import { deleteTaskById, getAllArchivedTasks, TaskResponse, toggleArchiveTaskById } from "../../services/task-services";
import ArchivedTask from "../../components/ArchivedTask/ArchivedTask";
import styles from "./CompletedTasks.module.scss";

interface CompletedTasksProps {
  archivedTasks: TaskResponse[];
  setArchivedTasks: (tasks: TaskResponse[]) => void;
}

const CompletedTasks = ({ archivedTasks, setArchivedTasks }: CompletedTasksProps ) => {
  useEffect(() => {
    getAllArchivedTasks()
      .then(data => setArchivedTasks(data))
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
      const updatedTasks = archivedTasks.filter(task => task.id !== id);
      setArchivedTasks(updatedTasks);
    }
  }

  const unArchiveTask = async (id: number) => {
    const confirmed = confirm("Move this task to Todo-list?");
    if(!confirmed) {
      return;
    }
    const isUnArchived = await toggleArchiveTaskById(id, false).catch((e) => {
      console.log(e);
      return false;
    });
    if (isUnArchived) {
      const updatedArchivedTasks = archivedTasks.filter(task => task.id !== id);
      setArchivedTasks(updatedArchivedTasks);
    }
  }

  return (
    <>
    <div className={styles.subHeadingContainer}>
      <h4 className={styles.subHeading}>Completed tasks</h4>
    </div>
      <div className={styles.tasksContainer}>
        {archivedTasks.map((task) => (
          <ArchivedTask task={task} key={task.id} onDelete={deleteTask} onUnArchive={unArchiveTask}/>
        ))}
      </div>
    </>
  )
}

export default CompletedTasks
