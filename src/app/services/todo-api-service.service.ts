import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TodoType } from '../types/todo.types';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getTodos() {
    return this.http.get(this.baseUrl + '/todo');
  }

  addTodo(todo: TodoType) {
    return this.http.post(this.baseUrl + '/todo', { ...todo });
  }
}
