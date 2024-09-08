package io.nology.todo.task;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long>{
  List<Task> findByIsArchivedFalseOrderByIsPriorityDesc();
  List<Task> findByIsArchived(boolean isArchived);
  List<Task> findByOrderByIsPriorityDesc();
}
