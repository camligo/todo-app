package io.nology.todo.task;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;

public class UpdateTaskDTO {
  @Length(min = 2, max = 100)
  @Pattern(regexp = ".*\\S.*", message = "Task cannot be empty")
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

  private Boolean isArchived;

  public Boolean getIsArchived() {
      return isArchived;
  }

  public void setIsArchived(Boolean isArchived) {
    this.isArchived = isArchived;
  }

  private Boolean isPriority;

  public Boolean getIsPriority() {
    return isPriority;
  }

  public void setIsPriority(Boolean isPriority) {
    this.isPriority = isPriority;
  }
}
