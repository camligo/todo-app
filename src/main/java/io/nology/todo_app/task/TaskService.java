package io.nology.todo_app.task;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

}
