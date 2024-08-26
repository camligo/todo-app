package io.nology.todo_app.category;

import jakarta.validation.constraints.NotBlank;

public class CreateCategoryDTO {
  @NotBlank
  private String name;

  public String getName() {
    return name;
  }
}
