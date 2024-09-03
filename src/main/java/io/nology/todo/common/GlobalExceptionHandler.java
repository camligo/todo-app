package io.nology.todo.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import io.nology.todo.common.exceptions.DuplicateCategoryException;
import io.nology.todo.common.exceptions.NotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<String> handleNotFoundException(NotFoundException exception) {
    return new ResponseEntity<String>(exception.getMessage(), HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(DuplicateCategoryException.class)
  public ResponseEntity<String> handleDuplicateCategoryException(DuplicateCategoryException exception) {
    return new ResponseEntity<String>(exception.getMessage(), HttpStatus.BAD_REQUEST);
  }
}
