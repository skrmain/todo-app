import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { UserService } from '../services/user.service';
import { UserProfile } from '../types/common.types';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule],
    template: `
        <h2 class="text-center">My Profile</h2>
        <div class="row mt-5" *ngIf="user">
            <div>
                <p><b>Email :</b> {{ user.email }}</p>
                <p><b>Account CreatedAt :</b> {{ user.createdAt | date : 'fullDate' }}</p>
                <p class="mt-4">
                    <button class="btn btn-danger" disabled>Delete Account</button>
                </p>
            </div>
        </div>
    `,
})
export class ProfileComponent implements OnInit {
    user?: UserProfile;
    constructor(private userService: UserService, private title: Title) {}

    ngOnInit() {
        this.title.setTitle('Profile | TodoApp');
        this.getUserDetail();
    }

    getUserDetail() {
        this.userService.getUserDetail().subscribe((result) => {
            this.user = result.data;
        });
    }
}
