package io.nology.todo_app.task;

import org.hibernate.validator.constraints.Length;

import io.nology.todo_app.category.Category;
import jakarta.validation.constraints.NotBlank;

public class CreateTaskDTO {
  @NotBlank
  @Length(min = 3)
  private String name;

  private Category category;

  public String getName() {
    return name;
  }
  public Category getCategory() {
    return category;
  }
}
