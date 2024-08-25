package io.nology.todo_app.task;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateTaskDTO {
  @NotBlank
  @Length(min = 3)
  private String name;

  @NotNull
  private Long categoryId;

  public String getName() {
    return name;
  }

  public Long getCategoryId() {
    return categoryId;
  }
}
