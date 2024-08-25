package io.nology.todo_app.category;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;

public class CreateCategoryDTO {
  @NotBlank
  @Length(min = 3)
  private String name;

  public String getName() {
    return name;
  }
}
