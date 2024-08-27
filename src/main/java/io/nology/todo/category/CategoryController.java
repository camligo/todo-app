package io.nology.todo.category;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("categories")
public class CategoryController {

  @Autowired
  private CategoryService categoryService;

  @PostMapping
  public ResponseEntity<Category> createCategory(@Valid @RequestBody CreateCategoryDTO data) throws Exception {
    Category createdCategory = this.categoryService.createCategory(data);
    return new ResponseEntity<Category>(createdCategory, HttpStatus.CREATED);
  }

  @GetMapping
  public ResponseEntity<List<Category>> findAllCategories() {
    List<Category> categories = this.categoryService.findAllCategories();
    return new ResponseEntity<List<Category>>(categories, HttpStatus.OK);
  }
}
