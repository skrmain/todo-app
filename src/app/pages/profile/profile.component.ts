import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-userdetail',
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
    user: any;
    constructor(private userService: UserService, private title: Title) {}

    ngOnInit() {
        this.title.setTitle('Profile | Angular-TodoApp');
        this.getUserDetail();
    }

    getUserDetail() {
        this.userService.getUserDetail().subscribe((result: any) => {
            this.user = result.data;
        });
    }
}
