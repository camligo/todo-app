package io.nology.todo.task;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.nology.todo.common.exceptions.NotFoundException;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("todos")
public class TaskController {

  @Autowired
  private TaskService taskService;

  @PostMapping
  public ResponseEntity<Task> createTask(@Valid @RequestBody CreateTaskDTO data) throws NotFoundException {
    Task createdTask = this.taskService.createTask(data);
    return new ResponseEntity<Task>(createdTask, HttpStatus.CREATED);
  }

  @GetMapping
  public ResponseEntity<List<Task>> findAllTasks (
    @RequestParam(required = false) Long category, @RequestParam(required = false) Boolean isArchived) {
    List<Task> tasks = this.taskService.findAllTasks();
    return new ResponseEntity<List<Task>>(tasks, HttpStatus.OK);
  }

  @GetMapping("/priority")
  public ResponseEntity<List<Task>> findTasksOrderedByPriority() throws NotFoundException {
    List<Task> prioritizedTasks = this.taskService.findAllTasksOrderedByPriority();
    if (prioritizedTasks.isEmpty()) {
      throw new NotFoundException("No high priority tasks found");
    }
    return new ResponseEntity<>(prioritizedTasks, HttpStatus.OK);
  }

  @GetMapping("/archive")
  public ResponseEntity<List<Task>> findAllArchivedTasks() {
    List<Task> archivedTasks = this.taskService.findAllArchivedTasks();
    return new ResponseEntity<>(archivedTasks, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Task> findTaskById(@PathVariable Long id) throws NotFoundException {
    Optional<Task> result = this.taskService.findTaskById(id);
    Task foundTask = result.orElseThrow(() -> new NotFoundException("Could not find task with id " + id));
    return new ResponseEntity<>(foundTask, HttpStatus.OK);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<Task> updateTaskById(@PathVariable Long id, @Valid @RequestBody UpdateTaskDTO data) throws NotFoundException {
    Optional<Task> result = this.taskService.updateTaskById(id, data);
    Task foundTask = result.orElseThrow(() -> new NotFoundException("Could not find task with id " + id));
    return new ResponseEntity<>(foundTask, HttpStatus.OK);
  }

  @PatchMapping("/{id}/archive")
  public ResponseEntity<Task> archiveTaskById(@PathVariable Long id, @RequestParam Boolean isArchived) throws NotFoundException {
    UpdateTaskDTO archiveTask = new UpdateTaskDTO();
    archiveTask.setIsArchived(isArchived);

    Optional<Task> result = this.taskService.updateTaskById(id, archiveTask);
    Task foundTask = result.orElseThrow(() -> new NotFoundException("Could not find task with id " + id));
    return new ResponseEntity<>(foundTask, HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTaskById(@PathVariable Long id) throws NotFoundException {
    boolean deletedTask = this.taskService.deleteTaskById(id);
    if (deletedTask == false) {
      throw new NotFoundException("Could not find task with id " + id);
    }
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
  // GET /todos?category={}
}
