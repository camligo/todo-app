package io.nology.todo.task;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;

import io.nology.todo.category.Category;
import io.nology.todo.category.CategoryService;

public class TaskServiceUnitTest {
  @Mock
  private TaskRepository repo;

  @Mock
  private CategoryService categoryService;

  @InjectMocks
  @Spy
  private TaskService taskService;

  @BeforeEach
  void setup() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void createTask_success() throws Exception {
    CreateTaskDTO mockDto = new CreateTaskDTO();
    mockDto.setName("Test Task");
    mockDto.setCategoryId(1L);

    Category mockCategory = new Category();
    mockCategory.setId(1L);
    mockCategory.setName("Test category");

    Task mockTask = new Task();
    mockTask.setName("Test Task");
    mockTask.setCategory(mockCategory);

    // when
    when(categoryService.findById(1L)).thenReturn(Optional.of(mockCategory));
    when(repo.save(any(Task.class))).thenReturn(mockTask);

    // then
    Task createdTask = taskService.createTask(mockDto);
    assertNotNull(createdTask);
    assertEquals("Test Task", createdTask.getName());
    verify(repo).save(any(Task.class));
  }

  @Test
    public void findTaskById_notFound() {
    when(repo.findById(1L)).thenReturn(Optional.empty());

    Optional<Task> foundTask = taskService.findTaskById(1L);
    assertFalse(foundTask.isPresent());
    verify(repo).findById(1L);
  }

  @Test
  public void deleteTaskById_success() {
    Task mockTask = new Task();
    mockTask.setId(1L);

    when(repo.findById(1L)).thenReturn(Optional.of(mockTask));
    doNothing().when(repo).delete(mockTask);

    boolean isDeleted = taskService.deleteTaskById(1L);
    assertTrue(isDeleted);
    verify(repo).delete(mockTask);
  }

  @Test
  public void deleteTaskById_notFound() {
    when(repo.findById(1L)).thenReturn(Optional.empty());

    boolean isDeleted = taskService.deleteTaskById(1L);
    assertFalse(isDeleted);
    verify(repo, never()).delete(any(Task.class));
  }
}
