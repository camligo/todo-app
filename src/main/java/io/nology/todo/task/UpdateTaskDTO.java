package io.nology.todo.task;

import java.util.Date;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;

public class UpdateTaskDTO {
  @Length(min = 2, max = 100)
  @Pattern(regexp = ".*\\S.*", message = "Task cannot be empty")
  private String name;
  @Min(1)
  private Long categoryId;
  private Boolean isArchived;
  private Boolean isPriority;
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


  public Boolean getIsArchived() {
      return isArchived;
  }

  public void setIsArchived(Boolean archiveStatus) {
    this.isArchived = archiveStatus;
  }

  public Boolean getIsPriority() {
    return isPriority;
  }

  public void setIsPriority(Boolean isPriority) {
    this.isPriority = isPriority;
  }

  public Date getDueDate() {
    return dueDate;
  }

  public void setDueDate(Date dueDate) {
    this.dueDate = dueDate;
  }

  
}
