import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  constructor(private http: HttpClient) {}
  baseURL = "http://localhost:3000";

  getTodos() {
    return this.http.get(this.baseURL + "/todo");
  }

  addTodo(message) {
    return this.http.post(this.baseURL + "/todo", { message: message });
  }

  deleteTodo(todo_id) {
    return this.http.delete(this.baseURL + "/todo/" + todo_id);
  }
}
