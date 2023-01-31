import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TodoService {
    constructor(private http: HttpClient) {}
    baseURL = environment.apiUrl;

    getTodos() {
        return this.http.get(this.baseURL + 'todo');
    }

    addTodo(data: any) {
        return this.http.post(this.baseURL + 'todo', data);
    }

    deleteTodo(id: string) {
        return this.http.delete(this.baseURL + 'todo/' + id);
    }
}
