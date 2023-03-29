import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root',
})
export class TodoService {
    constructor(private httpService: HttpService) {}

    getTodos() {
        return this.httpService.getData('todos');
    }

    addTodo(data: any) {
        return this.httpService.sendData('todos', data);
    }

    deleteTodo(todoId: string) {
        return this.httpService.deleteOne('todos/' + todoId);
    }

    updateTodo(todoId: string, data: any) {
        return this.httpService.updateOne('todos/' + todoId, data);
    }

    shareTodo(todoId: string, userId: string) {
        return this.httpService.updateOne(`todos/${todoId}/users/${userId}/permissions`, { permissions: ['read'] });
    }
}
