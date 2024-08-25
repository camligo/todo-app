package io.nology.todo_app.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

@Service
public class TaskService {

  @Autowired
  private TaskRepository repo;

  public String createTask(@Valid CreateTaskDTO data) {
    System.out.println("From service" + data);
    return "Got to the service";
  }

}
