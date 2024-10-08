package io.nology.todo.category;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.nology.todo.common.ValidationErrors;
import io.nology.todo.common.exceptions.ServiceValidationException;
import jakarta.validation.Valid;

@Service
public class CategoryService {

  @Autowired
  private CategoryRepository repo;

  public Category createCategory(@Valid CreateCategoryDTO data) throws ServiceValidationException {
    String name = data.getName();

    if (repo.existsByName(name)) {
      ValidationErrors errors = new ValidationErrors();
      errors.addError("Category '" + name + "' already exists");
      throw new ServiceValidationException(errors);
    }

    Category newCategory = new Category();
    String formattedName = formatName(data.getName());
    newCategory.setName(formattedName);
    return this.repo.save(newCategory);
  }

  private String formatName(String name) {
    if (name.isEmpty()) {
      return name;
    }
    name = name.trim().toLowerCase();
    return name.substring(0, 1).toUpperCase() + name.substring(1);
  }

  public Optional<Category> findById(Long categoryId) {
    return this.repo.findById(categoryId);
  }

  public List<Category> findAllCategories() {
    return this.repo.findAll();
  }
}
