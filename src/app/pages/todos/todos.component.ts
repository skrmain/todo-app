import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";

import { TodoService } from "../../services/todo.service";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
})
export class TodosComponent implements OnInit {
  todos: any = [];
  todoForm = this.fb.group({
    title: [""],
    detail: [""],
  });
  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private title: Title
  ) {}
  ngOnInit() {
    this.title.setTitle("Todos | Angular-TodoApp");
    this.getTodos();
  }

  addTodo() {
    let title = this.todoForm.get("title");
    let detail = this.todoForm.get("detail");

    if (
      title &&
      detail &&
      title.value &&
      title.value.trim() &&
      detail.value &&
      detail.value.trim()
    ) {
      this.todoService.addTodo(this.todoForm.value).subscribe((result) => {
        title?.setValue("");
        detail?.setValue("");
        this.getTodos();
      });
    } else {
      alert("Could not Add Empty Message");
    }
  }

  getTodos() {
    this.todoService.getTodos().subscribe((result: any) => {
      this.todos = result.data;
    });
  }

  deleteTodo(todoId: any) {
    this.todoService.deleteTodo(todoId).subscribe((result) => {
      this.getTodos();
    });
  }
}
