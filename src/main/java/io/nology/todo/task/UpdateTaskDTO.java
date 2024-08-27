package io.nology.todo.task;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;

public class UpdateTaskDTO {
  @Length(min = 3, max = 200)
  @Pattern(regexp = ".*\\S.*", message = "Todo-task can't be empty")
  private String name;

  @Min(1)
  private Long categoryId;

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
}
