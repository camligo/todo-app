package io.nology.todo.task;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.nology.todo.category.Category;
import io.nology.todo.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "tasks")
public class Task extends BaseEntity {

  public Task() {
    isArchived = false;
    isPriority = false;
  }

  @Column
  private String name;

  @ManyToOne
  @JoinColumn(name = "category_id")
  @JsonIgnoreProperties("tasks")
  private Category category;

  @Column
  @Temporal(TemporalType.TIMESTAMP)
  private Date dueDate;

  @Column
  private boolean isArchived;

  @Column
  private boolean isPriority;


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Category getCategory() {
    return category;
  }

  public void setCategory(Category category) {
    this.category = category;
  }

  public Date getDueDate() {
    return dueDate;
  }

  public void setDueDate(Date dueDate) {
    this.dueDate = dueDate;
  }

  public boolean isArchived() {
    return isArchived;
  }

  public void setArchived(boolean isArchived) {
    this.isArchived = isArchived;
  }

  public boolean isPriority() {
    return isPriority;
  }

  public void setPriority(boolean isPriority) {
    this.isPriority = isPriority;
  }
}
