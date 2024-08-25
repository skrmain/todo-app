import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-navbar',
    imports: [CommonModule, RouterModule],
    standalone: true,
    template: `
        <header class="navbar fixed-top navbar-expand navbar-dark bg-primary">
            <nav class="container flex-lg-nowrap">
                <a class="navbar-brand">TodoApp</a>
                <ul class="navbar-nav ml-auto w-100 pe-3">
                    @if (authService.isAuthenticated()) {
                    <li class="nav-item ml-2">
                        <a class="nav-link" routerLinkActive="active" [routerLink]="['/profile']">Profile</a>
                    </li>
                    <li class="nav-item ml-2">
                        <a class="nav-link" routerLinkActive="active" [routerLink]="['/']">Todos</a>
                    </li>
                    <li class="nav-item ms-auto">
                        <button class="btn btn-danger" (click)="logoutUser()">Logout</button>
                    </li>
                    } @else {
                    <li class="nav-item ml-2">
                        <a class="nav-link" routerLinkActive="active" [routerLink]="['/login']">Login</a>
                    </li>
                    <li class="nav-item ml-2">
                        <a class="nav-link" routerLinkActive="active" [routerLink]="['/signup']">Signup</a>
                    </li>
                    }
                </ul>
            </nav>
        </header>
    `,
})
export class NavbarComponent {
    readonly authService = inject(AuthService);
    constructor(private readonly router: Router) {}

    logoutUser() {
        this.authService.logoutUser();
        this.router.navigate(['/login']);
    }
}
