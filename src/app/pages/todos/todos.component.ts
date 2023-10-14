import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';

import { SearchUser, Todo, TodoPermissions, TodoStatus } from 'src/app/types/common.types';
import { TodoService } from '../../services/todo.service';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
})
export class TodosComponent implements OnInit {
    todos: Todo[] = [];
    shareModalVisible = false;
    activeTodoId: string | undefined;
    todoForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(5)]],
        detail: [''],
    });
    searchForm = this.fb.group({
        username: ['', [Validators.required]],
    });
    searchedUsers: SearchUser[] = [];
    selectedUserId: string | undefined;

    constructor(private fb: FormBuilder, private todoService: TodoService, private userService: UserService, private title: Title) {}
    ngOnInit() {
        this.title.setTitle('Todos | Angular-TodoApp');
        this.getTodos();
    }

    addTodo() {
        const { title, detail } = this.todoForm.value;

        if (title && detail && title.trim() && detail.trim()) {
            this.todoService.addTodo(this.todoForm.value).subscribe((result) => {
                this.todoForm.reset();
                this.getTodos();
            });
        } else {
            alert('Could not Add Empty Message');
        }
    }

    getTodos() {
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

    deleteTodo(todoId: string) {
        this.todoService.deleteTodo(todoId).subscribe((result) => {
            this.getTodos();
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

    searchUser() {
        const username = this.searchForm.get('username')?.value;
        console.log('S: ', username);
        if (!username) return;
        this.userService.searchUser(username).subscribe((result) => {
            if (result.data) {
                this.searchedUsers = result.data;
            }
        });
    }

    selectUser(userId: string) {
        this.selectedUserId = userId;
    }

    openShareModal(todoId: string) {
        this.shareModalVisible = true;
        this.activeTodoId = todoId;
    }

    closeShareModal() {
        this.shareModalVisible = false;
        this.activeTodoId = undefined;
        this.selectedUserId = undefined;
    }

    shareTodo() {
        if (this.activeTodoId && this.selectedUserId) {
            this.todoService.shareTodo(this.activeTodoId, this.selectedUserId).subscribe((result) => {
                console.log('Share Result ', result);
                this.closeShareModal();
            });
        }
    }

    canDelete(permissions: TodoPermissions[]) {
        return permissions.includes(TodoPermissions.delete);
    }

    canUpdate(permissions: TodoPermissions[]) {
        return permissions.includes(TodoPermissions.write);
    }

    canShare(permissions: TodoPermissions[]) {
        return permissions.includes(TodoPermissions.share);
    }
}
