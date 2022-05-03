import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  constructor(private http: HttpClient) {}
  baseURL = "http://localhost:8000/api";

  getTodos() {
    return this.http.get(this.baseURL + "/note");
  }

  addTodo(message) {
    return this.http.post(this.baseURL + "/note", {
      title: message,
      detail: "Empty",
    });
  }

  deleteTodo(todo_id) {
    return this.http.delete(this.baseURL + "/note/" + todo_id);
  }
}
