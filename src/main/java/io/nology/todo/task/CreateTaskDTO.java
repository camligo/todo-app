package io.nology.todo.task;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;

public class CreateTaskDTO {
  @NotBlank
  @Length(min = 3, max = 200)
  private String name;

  private Long categoryId;

  public String getName() {
    return name;
  }

  public Long getCategoryId() {
    return categoryId;
  }
}
