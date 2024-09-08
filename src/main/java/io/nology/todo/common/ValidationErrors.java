package io.nology.todo.common;

import java.util.ArrayList;

public class ValidationErrors {

    private ArrayList<String> errors;

    public ValidationErrors() {
        this.errors = new ArrayList<>();
    }

    public boolean isEmpty() {
        return this.errors.isEmpty();
    }

    public boolean hasErrors() {
        return !this.isEmpty();
    }

    public ArrayList<String> getErrors() {
        return new ArrayList<>(this.errors);
    }

    public void addError(String errorMessage) {
        this.errors.add(errorMessage);
    }

    @Override
    public String toString() {
        return this.errors.toString();
    }
}
