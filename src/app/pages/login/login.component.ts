import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    template: `
        <h2 class="text-center p-3">Login, here</h2>
        <app-alerts [errors]="errors"></app-alerts>
        <form [formGroup]="loginForm" (submit)="loginUser()">
            <app-email-control></app-email-control>
            <app-password-control></app-password-control>
            <app-submit-button label="Login" [invalid]="loginForm.invalid" [loader]="loader"></app-submit-button>
        </form>
    `,
})
export class LoginComponent implements OnInit {
    errors: string[] = [];
    loader = false;
    protected loginForm = this.fb.group({});

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private title: Title) {}

    ngOnInit() {
        this.title.setTitle('Login | Angular-TodoApp');
    }

    loginUser() {
        this.loader = true;
        this.errors = [];
        this.authService.loginUser(this.loginForm.value).subscribe({
            next: (result: any) => {
                if (result.data.token) {
                    this.authService.setToken(result.data.token);
                    this.router.navigate(['/']);
                    this.loader = false;
                } else {
                    this.errors.push('Something happen wrong try again.');
                    this.loginForm.reset();
                    this.loader = false;
                }
            },
            error: (error) => {
                this.loginForm.get('password')?.reset();
                this.errors.push(error.message);
                this.loader = false;
            },
        });
    }
}
