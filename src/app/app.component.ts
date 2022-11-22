import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiServiceService } from './services/todo-api-service.service';
import { TodoType } from './types/todo.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'website';
  todos: TodoType[] = [];
  todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    detail: new FormControl(''),
  });

  constructor(private apiService: ApiServiceService) {}

  ngOnInit() {
    this.apiService.getTodos().subscribe((data: any) => {
      console.log('[data]', data);
      this.todos = data.data;
    });
  }

  addTodo() {
    console.log('[form-data]', this.todoForm.value);
    this.apiService
      .addTodo({
        title: this.todoForm.get('title')?.value || '',
        detail: this.todoForm.get('detail')?.value || '',
      })
      .subscribe((data) => {
        console.log('[data] ', data);
        this.ngOnInit();
        this.todoForm.reset();
      });
  }
}
