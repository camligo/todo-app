package io.nology.todo.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import io.nology.todo.common.exceptions.NotFoundException;
import io.nology.todo.common.exceptions.ServiceValidationException;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<String> handleNotFoundException(NotFoundException exception) {
    return new ResponseEntity<String>(exception.getMessage(), HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(ServiceValidationException.class)
  public ResponseEntity<ValidationErrors> handleServiceValidationException(ServiceValidationException ex) {
    return new ResponseEntity<>(ex.getErrors(), HttpStatus.BAD_REQUEST);
  }
}
