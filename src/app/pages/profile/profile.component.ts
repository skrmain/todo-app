import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { UserService } from 'src/app/services/user.service';
import { UserProfile } from 'src/app/types/common.types';

@Component({
    selector: 'app-profile',
    template: `
        <h2 class="text-center">My Profile</h2>
        <div class="row mt-5" *ngIf="user">
            <div>
                <p><b>Username :</b> {{ user.username }}</p>
                <p><b>Email :</b> {{ user.email }}</p>
                <p><b>Status: </b><span class="text-success">Active</span></p>
                <p><b>Account CreatedAt :</b> {{ user.createdAt | date : 'fullDate' }}</p>
                <p class="mt-4">
                    <button class="btn btn-danger disabled">Delete Account</button>
                </p>
            </div>
        </div>
    `,
})
export class ProfileComponent implements OnInit {
    user?: UserProfile;
    constructor(private userService: UserService, private title: Title) {}

    ngOnInit() {
        this.title.setTitle('Profile | Angular-TodoApp');
        this.getUserDetail();
    }

    getUserDetail() {
        this.userService.getUserDetail().subscribe((result) => {
            this.user = result.data;
        });
    }
}
