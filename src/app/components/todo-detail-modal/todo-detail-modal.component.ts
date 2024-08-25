import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { UserService } from '../../services/user.service';
import { Todo, TodoStatus } from '../../types/common.types';
import { CanUpdatePipe } from '../../pipes/can-update.pipe';
import { CommonModule } from '@angular/common';
import { CanDeletePipe } from '../../pipes/can-delete.pipe';
import { CanSharePipe } from '../../pipes/can-share.pipe';
import { ShareModalComponent } from '../share-modal/share-modal.component';

@Component({
    selector: 'app-todo-detail-modal',
    standalone: true,
    imports: [CanUpdatePipe, CommonModule, CanDeletePipe, CanSharePipe, ShareModalComponent],
    template: `
        <div class="modal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Share Todo</h5>
                        <button
                            type="button"
                            (click)="closeModal()"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <div *ngIf="todo" class="row bg-white border align-items-center">
                            <span class="col-1">
                                <button
                                    [disabled]="!(todo.permissions | canUpdate)"
                                    class="btn m-0 p-0"
                                    style="border: none"
                                    (click)="
                                        todo.status === 'done'
                                            ? markUnDone(todo._id, todo.title)
                                            : markDone(todo._id, todo.title)
                                    "
                                >
                                    <i
                                        class="bi text-success"
                                        [ngClass]="todo.status === 'done' ? 'bi-check-square-fill' : 'bi-square'"
                                        style="font-size: 1.5rem"
                                    ></i>
                                </button>
                            </span>
                            <div
                                class="col-9 my-2"
                                [style]="{ 'text-decoration': todo.status === 'done' ? 'line-through' : 'initial' }"
                            >
                                <h3
                                    class="h5"
                                    [style]="{ 'text-decoration': todo.status === 'done' ? 'line-through' : 'initial' }"
                                >
                                    {{ todo.title }}
                                </h3>
                                <pre class="text-muted">{{ todo.detail }}</pre>
                            </div>
                            <span class="col-2 text-center">
                                <button
                                    *ngIf="todo.status === 'done'"
                                    [disabled]="!(todo.permissions | canUpdate)"
                                    class="btn m-0 p-0"
                                    style="border: none"
                                    (click)="markArchive(todo._id, todo.title)"
                                >
                                    <i class="bi bi-archive text-secondary"></i>
                                </button>
                                <button
                                    [disabled]="!(todo.permissions | canShare)"
                                    style="border: none"
                                    class="btn m-0 p-0"
                                    (click)="openShareModal(todo._id)"
                                >
                                    <i class="bi bi-share-fill text-primary" style="font-size: 1.3rem"></i>
                                </button>
                                <button
                                    [disabled]="!(todo.permissions | canDelete)"
                                    style="border: none"
                                    class="btn m-0 p-0"
                                    (click)="deleteTodo(todo._id)"
                                >
                                    <i class="bi bi-trash text-danger"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancel</button>
                        <!-- <button type="button" class="btn btn-primary" (click)="shareTodo()">Share</button> -->
                    </div>
                </div>
            </div>
        </div>
        <app-share-modal
            [activeTodoId]="activeTodoId"
            *ngIf="shareModalVisible && activeTodoId"
            (closeModalEvent)="closeShareModal()"
        ></app-share-modal>
    `,
    styles: [],
})
export class TodoDetailModalComponent {
    @Input() todo?: Todo;
    todos: Todo[] = [];

    constructor(private fb: FormBuilder, private todoService: TodoService, private userService: UserService) {}

    deleteTodo(todoId: string) {
        this.todoService.deleteTodo(todoId).subscribe((result) => {
            this.getTodos();
        });
    }

    getTodos(type = '') {
        console.log({ type });

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
    markDone(todoId: string, title: string) {
        this.updateTodo(todoId, { title, status: TodoStatus.done });
    }

    // TODO: remove title
    markUnDone(todoId: string, title: string) {
        this.updateTodo(todoId, { title, status: TodoStatus.created });
    }

    // TODO: remove title
    markArchive(todoId: string, title: string) {
        this.updateTodo(todoId, { title, status: TodoStatus.archive });
    }

    updateTodo(todoId: string, data: any) {
        this.todoService.updateTodo(todoId, data).subscribe((result) => {
            this.getTodos();
        });
    }

    shareModalVisible = false;
    activeTodoId: string | undefined;

    openShareModal(todoId: string) {
        this.activeTodoId = todoId;
        this.shareModalVisible = true;
    }

    closeShareModal() {
        this.shareModalVisible = false;
        this.activeTodoId = undefined;
    }

    @Output() closeModalEvent = new EventEmitter<boolean>();

    closeModal() {
        this.closeModalEvent.emit(true);
    }
}
