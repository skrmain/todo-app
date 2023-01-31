import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { TodoType } from 'src/app/types/common.types';
import { TodoService } from '../../services/todo.service';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
})
export class TodosComponent implements OnInit {
    todos: TodoType[] = [];
    todoForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(5)]],
        detail: [''],
    });
    constructor(private fb: FormBuilder, private todoService: TodoService, private title: Title) {}
    ngOnInit() {
        this.title.setTitle('Todos | Angular-TodoApp');
        this.getTodos();
    }

    addTodo() {
        const { title, detail } = this.todoForm.value;

        if (title && detail && title.trim() && detail.trim()) {
            this.todoService.addTodo(this.todoForm.value).subscribe((result) => {
                // title?.setValue('');
                // detail?.setValue('');
                this.todoForm.reset();
                this.getTodos();
            });
        } else {
            alert('Could not Add Empty Message');
        }
    }

    getTodos() {
        this.todoService.getTodos().subscribe((result: any) => {
            this.todos = result.data;
        });
    }

    deleteTodo(todoId: string) {
        this.todoService.deleteTodo(todoId).subscribe((result) => {
            this.getTodos();
        });
    }
}
