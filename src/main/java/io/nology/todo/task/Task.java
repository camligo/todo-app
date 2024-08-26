package io.nology.todo.task;

import io.nology.todo.category.Category;
import io.nology.todo.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tasks")
public class Task extends BaseEntity {

  public Task() {
  }

  @Column
  private String name;

  @ManyToOne
  @JoinColumn(name = "category_id", nullable = false)
  private Category category;

  @Column
  private boolean isArchived = false;

  public String getName() {
    return name;
  }

  public Category getCategory() {
    return category;
  }

  public boolean isArchived() {
    return isArchived;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setCategory(Category category) {
    this.category = category;
  }

  public void setArchived(boolean isArchived) {
    this.isArchived = isArchived;
  }
}
