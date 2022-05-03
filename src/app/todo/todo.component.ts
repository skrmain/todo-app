import { Component, OnInit } from "@angular/core";

import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { TodoService } from "./../todo.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"],
})
export class TodoComponent implements OnInit {
  todos: any = [];
  todoform: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private title: Title
  ) {}
  ngOnInit() {
    this.title.setTitle("Todos | TodoApp");
    this.todoform = this.formBuilder.group({
      message: new FormControl(),
    });
    this.getTodos();
  }

  // save new todo
  saveMessage() {
    let message = this.todoform.get("message");
    if (message.value && message.value.trim()) {
      this.todoService.addTodo(message.value).subscribe((result) => {
        message.setValue("");
        this.getTodos();
      });
    } else {
      alert("Could not Add Empty Message");
    }
  }

  // get all the todos
  getTodos() {
    this.todoService.getTodos().subscribe((result: any) => {
      this.todos = result.data;
    });
  }

  // delete the todo
  deleteTodo(todo_id) {
    this.todoService.deleteTodo(todo_id).subscribe((result) => {
      this.getTodos();
    });
  }
}
