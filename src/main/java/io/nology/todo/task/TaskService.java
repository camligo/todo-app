package io.nology.todo.task;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.nology.todo.category.Category;
import io.nology.todo.category.CategoryService;
import io.nology.todo.common.exceptions.NotFoundException;
import jakarta.validation.Valid;

@Service
public class TaskService {

  @Autowired
  private TaskRepository repo;

  @Autowired
  private CategoryService categoryService;

  public Task createTask(@Valid CreateTaskDTO data) throws NotFoundException {
    Category category = categoryService.findById(data.getCategoryId())
      .orElseThrow(() -> new NotFoundException("Category not found"));

    Task newTask = new Task();
    String formattedName = formatName(data.getName());

    newTask.setName(formattedName);
    newTask.setCategory(category);
    newTask.setPriority(data.getPriority() != null ? data.getPriority() : false);
    newTask.setDueDate(data.getDueDate());

    return this.repo.save(newTask);
  }

  private String formatName(String name) {
    if (name.isEmpty()) {
      return name;
    }
    name = name.trim().toLowerCase();
    return name.substring(0, 1).toUpperCase() + name.substring(1);
  }

  public List<Task> findAllTasks() {
    return this.repo.findByIsArchivedFalseOrderByIsPriorityDesc();
  }

  public List<Task> findAllTasksOrderedByPriority() {
    return this.repo.findByOrderByIsPriorityDesc();
  }

  public List<Task> findAllArchivedTasks() {
    return this.repo.findByIsArchived(true);
  }

  public Optional<Task> findTaskById(Long id) {
    return this.repo.findById(id);
  }

  public Optional<Task> updateTaskById(Long id, @Valid UpdateTaskDTO data) {
    Optional<Task> result = this.findTaskById(id);
    if (result.isEmpty()) {
      return result;
    }

    Task foundTask = result.get();

    if (data.getName() != null) {
      foundTask.setName(data.getName().trim());
    }
    if (data.getCategoryId() != null) {
      Optional<Category> category = this.categoryService.findById(data.getCategoryId());

      if (category.isPresent()) {
        foundTask.setCategory(category.get());
      } else {
        System.out.println("Category " + data.getCategoryId() + "doesn't exist");
      }
    }
    if (data.getIsArchived() != null) {
      foundTask.setArchived(data.getIsArchived());
    }
    if (data.getIsPriority() != null) {
      foundTask.setPriority(data.getIsPriority());
    }
    Task updatedTask = this.repo.save(foundTask);
    return Optional.of(updatedTask);
  }

  public boolean deleteTaskById(Long id) {
    Optional<Task> result = this.findTaskById(id);
    if (result.isEmpty()) {
      return false;
    }
    this.repo.delete(result.get());
    return true;
  }
}
