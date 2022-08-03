package com.example.todo;

import java.util.UUID;

public class Todo {
  UUID id;
  String task;

  public Todo(String task) {
    setId(id);
    setTask(task);
  }

//  public static Todo of(String task) {
//    return of(null, task);
//  }
//
//  public static Todo of(UUID id, String task) {
//    Todo data = new Todo();
//    data.setId(id);
//    data.setTask(task);
//    return data;
//  }

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public String getTask() {
    return task;
  }

  public void setTask(String task) {
    this.task = task;
  }

  @Override
  public String toString() {
    return "Task{" +
      "id='" + id + '\'' +
      ", task='" + task +
      '}';
  }
}
