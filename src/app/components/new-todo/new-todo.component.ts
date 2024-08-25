import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { TodoService } from '../../services/todo.service';

@Component({
    selector: 'app-new-todo',
    template: `
        <form [formGroup]="todoForm" (submit)="addTodo()">
            <div class="form-control d-flex flex-column">
                <input type="text" class="h5" placeholder="Title" formControlName="title" />
                <textarea type="text" placeholder="Detail" formControlName="detail"></textarea>
                <div class="d-flex justify-content-end mt-1">
                    <button type="submit" class="btn btn-outline-success btn-sm">Add</button>
                </div>
            </div>
        </form>
    `,
    styles: ['input, input:focus-visible, textarea, textarea:focus-visible{ border: none; outline: none; }'],
})
export class NewTodoComponent {
    @Output() newItemEvent = new EventEmitter<string>();
    todoForm;
    constructor(private fb: FormBuilder, private todoService: TodoService) {
        this.todoForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(5)]],
            detail: [''],
        });
    }

    addTodo() {
        const { title, detail } = this.todoForm.value;

        if (title && detail && title.trim() && detail.trim()) {
            this.todoService.addTodo(this.todoForm.value).subscribe((result) => {
                this.todoForm.reset();
                this.newItemEvent.emit('NEW');
            });
        } else {
            alert('Could not Add Empty Message');
        }
    }
}
