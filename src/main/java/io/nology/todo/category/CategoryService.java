package io.nology.todo.category;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

@Service
public class CategoryService {

  @Autowired
  private CategoryRepository repo;

  public Category createCategory(@Valid CreateCategoryDTO data) {
    Category newCategory = new Category();
    newCategory.setName(data.getName().trim());
    return this.repo.save(newCategory);
  }

  public List<Category> findAll() {
    return this.repo.findAll();
  }
}
