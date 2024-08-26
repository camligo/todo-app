package io.nology.todo_app.task;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import io.nology.todo_app.category.Category;
import io.nology.todo_app.category.CategoryRepository;
import jakarta.validation.Valid;

@Service
public class TaskService {

  @Autowired
  private TaskRepository repo;

  @Autowired
  private CategoryRepository categoryRepo;

  public Task createTask(@Valid CreateTaskDTO data) {
    Category category = categoryRepo.findById(data.getCategoryId())
      .orElseThrow(() -> new RuntimeException("Category not found"));

    Task newTask = new Task();
    newTask.setName(data.getName().trim());
    newTask.setCategory(category);
    return this.repo.save(newTask);
  }

  public List<Task> findAll() {
    return this.repo.findAll();
  }

  public Optional<Task> findTaskById(Long id) {
    return this.repo.findById(id);
  }

  // public Optional<Task> updateTaskById(Long id, @Valid UpdateTaskDTO data) {
  //   Optional<Task> result = this.findTaskById(id);
  //   if (result.isEmpty()) {
  //     return result;
  //   }
  //   Task foundTask = result.get();
  //   if (data.getName() != null) {
  //     foundTask.setName(data.getName().trim());
  //   }
  //   if (data.getCategoryId() != null) {
  //     foundTask.setCategoryId(data.getCategoryId());
  //   }
  //   Task updatedTask = this.repo.save(foundTask);
  //   return Optional.of(updatedTask);
  // }

  public boolean deleteTaskById(Long id) {
    Optional<Task> result = this.findTaskById(id);
    if (result.isEmpty()) {
      return false;
    }
    this.repo.delete(result.get());
    return true;
  }

}
