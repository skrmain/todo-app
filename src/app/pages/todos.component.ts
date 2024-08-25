import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { Todo, TodoStatus } from '../types/common.types';
import { TodoService } from '../services/todo.service';
import { CanUpdatePipe } from '../pipes/can-update.pipe';
import { NewTodoComponent } from '../components/new-todo.component';
import { ShareModalComponent } from '../components/share-modal.component';
import { TodoDetailModalComponent } from '../components/todo-detail-modal.component';

@Component({
    selector: 'app-todos',
    standalone: true,
    imports: [CanUpdatePipe, NewTodoComponent, CommonModule, ShareModalComponent, TodoDetailModalComponent],
    template: `
        <app-new-todo (newItemEvent)="getTodos($event)"></app-new-todo>
        <div class="mt-3">
            <ul class="container" style="height: 67vh; overflow-y: auto" *ngIf="todos.length">
                <li *ngFor="let todo of todos" class="row bg-white border align-items-center">
                    <span class="col-2">
                        <button
                            [disabled]="!(todo.permissions | canUpdate)"
                            class="btn"
                            style="border: none"
                            (click)="toggleTodoDone(todo)"
                        >
                            <i
                                class="bi text-success"
                                [ngClass]="todo.status === 'done' ? 'bi-check-square-fill' : 'bi-square'"
                                style="font-size: 1.5rem"
                            ></i>
                        </button>
                    </span>
                    <div
                        (click)="openDetailModal(todo)"
                        class="col-10 mt-3"
                        [style]="{
                            'text-decoration': todo.status === 'done' ? 'line-through' : 'initial',
                            cursor: 'pointer'
                        }"
                    >
                        <h3
                            class="h5"
                            [style]="{ 'text-decoration': todo.status === 'done' ? 'line-through' : 'initial' }"
                        >
                            {{ todo.title }}
                        </h3>
                        <pre class="text-muted">{{ todo.detail }}</pre>
                    </div>
                </li>
            </ul>
            <p *ngIf="!todos.length" class="text-center mt-5">No Todo</p>
        </div>
        <app-share-modal
            [activeTodoId]="activeTodoId"
            *ngIf="shareModalVisible && activeTodoId"
            (closeModalEvent)="closeShareModal()"
        ></app-share-modal>
        <app-todo-detail-modal
            [todo]="activeTodo"
            *ngIf="detailModalVisible && activeTodo"
            (closeModalEvent)="closeDetailModal()"
        ></app-todo-detail-modal>
    `,
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
