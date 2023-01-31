import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-userdetail',
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
    user: any;
    constructor(private authService: AuthService, private title: Title) {}

    ngOnInit() {
        this.title.setTitle('Profile | Angular-TodoApp');
        this.getUserDetail();
    }

    getUserDetail() {
        this.authService.getUserDetail().subscribe((result: any) => {
            this.user = result.data;
        });
    }
}
