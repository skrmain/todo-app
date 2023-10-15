import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-navbar',
    template: `
        <nav class="navbar fixed-top navbar-expand navbar-dark bg-primary">
            <a class="navbar-brand">{{ title }}</a>
            <ul class="navbar-nav ml-auto w-100 pe-3">
                <li class="nav-item ml-2" *ngIf="!isAuthenticated()">
                    <a class="nav-link" routerLinkActive="active" [routerLink]="['/login']">Login</a>
                </li>
                <li class="nav-item ml-2" *ngIf="!isAuthenticated()">
                    <a class="nav-link" routerLinkActive="active" [routerLink]="['/signup']">Signup</a>
                </li>
                <li class="nav-item ml-2" *ngIf="isAuthenticated()">
                    <a class="nav-link" routerLinkActive="active" [routerLink]="['/profile']">Profile</a>
                </li>
                <li class="nav-item ml-2" *ngIf="isAuthenticated()">
                    <a class="nav-link" routerLinkActive="active" [routerLink]="['/todos']">Todos</a>
                </li>
                <li class="nav-item ms-auto" *ngIf="isAuthenticated()">
                    <button class="btn btn-danger" (click)="logoutUser()">Logout</button>
                </li>
            </ul>
        </nav>
    `,
})
export class NavbarComponent {
    title = document.title;

    constructor(private router: Router, private authService: AuthService) {}

    // TODO: check is there any side-effect of using this
    // NOTE: function so that on state change it can be checked if user is authenticated or not
    isAuthenticated() {
        return this.authService.isAuthenticated();
    }

    logoutUser() {
        this.authService.logoutUser();
        this.router.navigate(['/login']);
    }
}
