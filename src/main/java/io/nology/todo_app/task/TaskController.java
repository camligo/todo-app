package io.nology.todo_app.task;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("todos")
public class TaskController {

  @Autowired
  private TaskService taskService;

  @PostMapping
  public ResponseEntity<Task> createTask(@Valid @RequestBody CreateTaskDTO data) {
    Task createdTask = this.taskService.createTask(data);
    return new ResponseEntity<Task>(createdTask, HttpStatus.CREATED);
  }

  @GetMapping
  public ResponseEntity<List<Task>> findAllTasks() {
    List<Task> tasks = this.taskService.findAll();
    return new ResponseEntity<List<Task>>(tasks, HttpStatus.OK);
  }


  // getAllTodos
  // GET /todos?category={}
  // POST /todos
  // PUT/PATCH /todos/:id
  // DELETE /todos/:id
}
