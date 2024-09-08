package io.nology.todo.task;

import java.util.Date;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;

public class CreateTaskDTO {
  @NotBlank(message = "Task name cannot be empty")
  @Length(min = 2, max = 100)
  private String name;
  private Long categoryId;
  private Boolean priority = false;
  @FutureOrPresent(message = "Due date cannot be in the past")
  private Date dueDate;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Long getCategoryId() {
    return categoryId;
  }

  public void setCategoryId(Long categoryId) {
    this.categoryId = categoryId;
  }

  public Boolean getPriority() {
    return priority;
  }

  public void setPriority(Boolean priority) {
    this.priority = priority;
  }

  public Date getDueDate() {
    return dueDate;
  }

  public void setDueDate(Date dueDate) {
    this.dueDate = dueDate;
  }
}
