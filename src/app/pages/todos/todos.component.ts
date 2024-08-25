import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Todo, TodoStatus } from '../../types/common.types';
import { TodoService } from '../../services/todo.service';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
})
export class TodosComponent implements OnInit {
    todos: Todo[] = [];
    shareModalVisible = false;
    detailModalVisible = false;
    activeTodoId: string | undefined;
    activeTodo?: Todo;

    constructor(private todoService: TodoService, private title: Title) {}
    ngOnInit() {
        this.title.setTitle('Todos | TodoApp');
        this.getTodos();
    }

    getTodos(type = '') {
        this.todoService.getTodos().subscribe((result) => {
            if (result.data) {
                this.todos = result.data.sort((a: Todo, b: Todo) => {
                    const x = a.status;
                    const y = b.status;
                    return x < y ? -1 : x > y ? 1 : 0;
                });
            }
        });
    }

    // TODO: remove title
    toggleTodoDone(todo: Todo) {
        if (todo.status === TodoStatus.done) {
            this.updateTodo(todo._id, { title: todo.title, status: TodoStatus.created });
        } else {
            this.updateTodo(todo._id, { title: todo.title, status: TodoStatus.done });
        }
    }

    updateTodo(todoId: string, data: any) {
        this.todoService.updateTodo(todoId, data).subscribe((result) => {
            this.getTodos();
        });
    }

    openDetailModal(todo: Todo) {
        this.activeTodo = todo;
        this.detailModalVisible = true;
    }

    closeDetailModal() {
        this.detailModalVisible = false;
        this.activeTodo = undefined;
    }

    openShareModal(todoId: string) {
        this.activeTodoId = todoId;
        this.shareModalVisible = true;
    }

    closeShareModal() {
        this.shareModalVisible = false;
        this.activeTodoId = undefined;
    }
}
