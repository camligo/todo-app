package io.nology.todo.task;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;

import io.nology.todo.category.Category;
import io.nology.todo.category.CategoryRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class TaskEndToEndTest {
  @LocalServerPort
  private int port;

  @Autowired
  private TaskRepository taskRepository;

  @Autowired
  private CategoryRepository categoryRepository;

  private Long categoryId1;
  private Long categoryId2;

  @BeforeEach
  public void setUp() {
    RestAssured.port = port;
    taskRepository.deleteAll();
    categoryRepository.deleteAll();

    Category category1 = new Category();
    category1.setName("Personal");
    Category savedCategory1 = categoryRepository.save(category1);
    categoryId1 = savedCategory1.getId();  // Store the generated ID

    Category category2 = new Category();
    category2.setName("Home");
    Category savedCategory2 = categoryRepository.save(category2);
    categoryId2 = savedCategory2.getId();

    Task task1 = new Task();
    task1.setName("Walk the dog");
    task1.setCategory(savedCategory1);
    task1.setPriority(false);
    taskRepository.save(task1);

    Task task2 = new Task();
    task2.setName("Hang up laundry");
    task2.setCategory(savedCategory2);
    task2.setPriority(false);
    taskRepository.save(task2);
  }

  @Test
  public void getAllTasks() {
    given()
      .when()
      .get("/todos")
      .then()
      .statusCode(HttpStatus.OK.value())
      .body("$", hasSize(2))
      .body("name", hasItems("Walk the dog", "Hang up laundry"))
      .body("category.name", hasItems("Personal", "Home"))
      .body(matchesJsonSchemaInClasspath("io/nology/todo/task/schemas/tasks-schema.json"));
  }

  @Test
  public void createTask_success() {
    CreateTaskDTO data = new CreateTaskDTO();
    data.setName("Prepare report");
    data.setCategoryId(categoryId1);

    given()
      .contentType(ContentType.JSON)
      .body(data)
      .when()
      .post("/todos")
      .then()
      .statusCode(HttpStatus.CREATED.value())
      .body("name", equalTo("Prepare report"))
      .body("id", notNullValue())
      .body(matchesJsonSchemaInClasspath("io/nology/todo/task/schemas/task-schema.json"));
  }

  @Test
  public void createTask_withDueDate_success() throws ParseException {
    CreateTaskDTO data = new CreateTaskDTO();
    data.setName("Submit report");

    // convert String into a Date object
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
    // convert date
    Date dueDate = formatter.parse("2024-09-11T14:00:00.000+00:00");
    data.setDueDate(dueDate);

    data.setCategoryId(categoryId2);

    given()
      .contentType(ContentType.JSON)
      .body(data)
      .when()
      .post("/todos")
      .then()
      .statusCode(HttpStatus.CREATED.value())
      .body("name", equalTo("Submit report"))
      .body("dueDate", equalTo("2024-09-11T14:00:00.000+00:00"))
      .body("category.name", equalTo("Home"));
  }

  @Test
  public void createTask_withoutDueDate_success() {
    CreateTaskDTO data = new CreateTaskDTO();
    data.setName("Prepare presentation");
    data.setCategoryId(categoryId2);

    given()
      .contentType(ContentType.JSON)
      .body(data)
      .when()
      .post("/todos")
      .then()
      .statusCode(HttpStatus.CREATED.value())
      .body("name", equalTo("Prepare presentation"))
      .body("dueDate", nullValue())  // verify that dueDate is null
      .body("category.name", equalTo("Home"));
  }

  @Test
  public void createTask_withNonExistentCategory_failure() {
    CreateTaskDTO data = new CreateTaskDTO();
    data.setName("Prepare report");
    data.setCategoryId(999L);
    given()
      .contentType(ContentType.JSON)
      .body(data)
      .when()
      .post("/todos")
      .then()
      .statusCode(HttpStatus.NOT_FOUND.value())
      .body(equalTo("Category not found"));
  }

  @Test
  public void updateTask_success() {
    Task task = new Task();
    task.setName("Old Task");
    task.setCategory(categoryRepository.findById(1L).get());
    task.setArchived(false);
    Task savedTask = taskRepository.save(task);

    UpdateTaskDTO updateData = new UpdateTaskDTO();
    updateData.setName("Updated Task Name");
    updateData.setCategoryId(2L);
    updateData.setIsArchived(true);

    given()
      .contentType(ContentType.JSON)
      .body(updateData)
      .when()
      .patch("/todos/" + savedTask.getId())
      .then()
      .statusCode(HttpStatus.OK.value())
      .body("name", equalTo("Updated Task Name"))
      .body("category.name", equalTo("Home"))
      .body("archived", equalTo(true));
  }

  @Test
  public void archiveTask_success() {
    Task task = new Task();
    task.setName("Task to archive");
    task.setCategory(categoryRepository.findById(categoryId1).get());
    task.setArchived(false);
    Task savedTask = taskRepository.save(task);

    given()
      .contentType(ContentType.JSON)
      .body("true")
      .when()
      .patch("/todos/" + savedTask.getId() + "/archive")
      .then()
      .statusCode(HttpStatus.OK.value());

    // verify that task is archived
    given()
      .when()
      .get("/todos/" + savedTask.getId())
      .then()
      .statusCode(HttpStatus.OK.value())
      .body("archived", equalTo(true));

    // verify archived tasks doesn't get returned in default query
    given()
      .when()
      .get("/todos")
      .then()
      .statusCode(HttpStatus.OK.value())
      .body("name", not(hasItem("Task to archive")));
  }

  @Test
  public void getAllTasksSortedByPriority_success() {
    Task task1 = new Task();
    task1.setName("Low Priority Task");
    task1.setPriority(false);
    task1.setArchived(false);
    taskRepository.save(task1);

    Task task2 = new Task();
    task2.setName("High Priority Task");
    task2.setPriority(true);
    task2.setArchived(false);
    taskRepository.save(task2);

    Task task3 = new Task();
    task3.setName("Archived Task");
    task3.setPriority(true);
    task3.setArchived(true);
    taskRepository.save(task3);

    given()
      .when()
      .get("/todos")
      .then()
      .statusCode(HttpStatus.OK.value())
      .body("name[0]", equalTo("High Priority Task"))
      .body("name", not(hasItem("Archived Task")));
}
}
