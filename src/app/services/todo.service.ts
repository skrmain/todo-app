import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { Todo } from '../types/common.types';

@Injectable({
    providedIn: 'root',
})
export class TodoService {
    constructor(private _httpService: HttpService) {}

    getTodos() {
        return this._httpService.getData<Todo[]>('/todos');
    }

    addTodo(data: any) {
        return this._httpService.sendData('/todos', data);
    }

    deleteTodo(todoId: string) {
        return this._httpService.deleteOne('/todos/' + todoId);
    }

    updateTodo(todoId: string, data: any) {
        return this._httpService.updateOne('/todos/' + todoId, data);
    }

    shareTodo(todoId: string, userId: string) {
        return this._httpService.updateOne(`/todos/${todoId}/users/${userId}/permissions`, { permissions: ['read'] });
    }
}
