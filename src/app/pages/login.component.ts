import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alerts.service';
import { EmailControlComponent } from '../components/email-control.component';
import { PasswordControlComponent } from '../components/password-control.component';
import { SubmitButtonComponent } from '../components/submit-button.component';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        EmailControlComponent,
        PasswordControlComponent,
        SubmitButtonComponent,
        CommonModule,
    ],
    template: `
        <h2 class="text-center p-3">Login, here</h2>
        <form [formGroup]="loginForm" (submit)="loginUser()">
            <app-email-control></app-email-control>
            <app-password-control></app-password-control>
            <app-submit-button label="Login" [invalid]="loginForm.invalid" [loader]="loader"></app-submit-button>
        </form>
    `,
})
export class LoginComponent implements OnInit {
    loader = false;
    protected loginForm;
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private title: Title,
        private readonly alertService: AlertService
    ) {
        this.loginForm = this.fb.group({});
    }

    ngOnInit() {
        this.title.setTitle('Login | TodoApp');
    }

    loginUser() {
        this.loader = true;
        this.authService.loginUser(this.loginForm.value).subscribe({
            next: (result: any) => {
                if (result.data.token) {
                    this.authService.setToken(result.data.token);
                    this.router.navigate(['/']);
                    this.loader = false;
                } else {
                    this.alertService.alert('Something happen wrong try again.');
                    this.loginForm.reset();
                    this.loader = false;
                }
            },
            error: (error) => {
                this.loginForm.get('password')?.reset();
                this.alertService.alert(error.message);
                this.loader = false;
            },
        });
    }
}
