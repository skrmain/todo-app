import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { UserService } from '../../services/user.service';
import { SearchUser } from '../../types/common.types';

@Component({
    selector: 'app-share-modal',
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
                        <form [formGroup]="searchForm" (submit)="searchUser()">
                            <div>
                                <input type="text" formControlName="username" (input)="searchUser()" />
                            </div>
                        </form>
                        <div>
                            <p
                                *ngFor="let user of searchedUsers"
                                class="btn d-block"
                                [ngClass]="{
                                    'btn-outline-primary': user._id !== selectedUserId,
                                    'btn-primary': user._id === selectedUserId
                                }"
                                (click)="selectUser(user._id)"
                            >
                                {{ user.username }}
                            </p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancel</button>
                        <button type="button" class="btn btn-primary" (click)="shareTodo()">Share</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [],
})
export class ShareModalComponent {
    @Input() activeTodoId?: string;
    @Output() closeModalEvent = new EventEmitter<boolean>();
    searchForm;
    searchedUsers: SearchUser[] = [];
    selectedUserId: string | undefined;

    constructor(private fb: FormBuilder, private todoService: TodoService, private userService: UserService) {
        this.searchForm = this.fb.group({
            username: ['', [Validators.required]],
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

    shareTodo() {
        if (this.activeTodoId && this.selectedUserId) {
            this.todoService.shareTodo(this.activeTodoId, this.selectedUserId).subscribe((result) => {
                console.log('Share Result ', result);
                this.closeModal();
            });
        }
    }

    closeModal() {
        this.closeModalEvent.emit(true);
    }
}
