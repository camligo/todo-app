package io.nology.todo.task;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.nology.todo.category.Category;
import io.nology.todo.category.CategoryService;
import jakarta.validation.Valid;

@Service
public class TaskService {

  @Autowired
  private TaskRepository repo;

  @Autowired
  private CategoryService categoryService;

  public Task createTask(@Valid CreateTaskDTO data) {
    // todo: handle exception
    Category category = categoryService.findById(data.getCategoryId())
      .orElseThrow(() -> new RuntimeException("Category not found"));

    Task newTask = new Task();
    newTask.setName(data.getName().trim());
    newTask.setCategory(category);
    return this.repo.save(newTask);
  }

  public List<Task> findAllTasks() {
    return this.repo.findAll();
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
      if (category.isEmpty()) {
        System.out.println("Category " + id + "doesn't exist");
      } else {
        foundTask.setCategory(category.get());
      }
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
