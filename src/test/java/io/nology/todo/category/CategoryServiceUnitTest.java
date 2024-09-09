package io.nology.todo.category;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;

import io.nology.todo.common.exceptions.ServiceValidationException;

public class CategoryServiceUnitTest {
  @Mock
  private CategoryRepository repo;

  @InjectMocks
  @Spy
  private CategoryService categoryService;

  @BeforeEach
  void setup() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void findAllCategories() {
    categoryService.findAllCategories();
    verify(repo).findAll();
  }

  @Test
  public void findById() {
    Long categoryId = 1L;
    categoryService.findById(categoryId);
    verify(repo).findById(categoryId);
  }

  @Test
  public void create_success() throws Exception {
    // given
    CreateCategoryDTO mockDto = new CreateCategoryDTO();
    mockDto.setName("Test");
    Category mockCategory = new Category();
    mockCategory.setName("Test");

    // when
    when(repo.existsByName("Test")).thenReturn(false);
    when(repo.save(any(Category.class))).thenReturn(mockCategory);

    // then
    Category createdCategory = categoryService.createCategory(mockDto);
    assertNotNull(createdCategory);
    assertEquals("Test", createdCategory.getName());
  }

  @Test
  public void create_alreadyExists() throws Exception {
    // given
    CreateCategoryDTO mockDto = new CreateCategoryDTO();
    mockDto.setName("Test");

    // when
    when(repo.existsByName("Test")).thenReturn(true);

    // then
    ServiceValidationException exception = assertThrows(ServiceValidationException.class, () -> {
        categoryService.createCategory(mockDto);
    });
    assertTrue(exception.getErrors().getErrors().contains("Category 'Test' already exists"));
  }
}
