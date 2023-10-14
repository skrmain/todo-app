import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-signup',
    template: `
        <h2 class="text-center p-3">Signup, here</h2>
        <app-alerts [errors]="errors"></app-alerts>
        <form [formGroup]="signupForm" (submit)="signupUser()">
            <app-username-control></app-username-control>
            <app-email-control></app-email-control>
            <app-password-control></app-password-control>
            <app-submit-button label="Signup" [invalid]="signupForm.invalid" [loader]="loader"></app-submit-button>
        </form>
    `,
})
export class SignupComponent implements OnInit {
    errors: string[] = [];
    loader = false;
    protected signupForm = this.fb.group({});
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private title: Title) {}

    ngOnInit() {
        this.title.setTitle('SignUp | Angular-TodoApp');
    }

    signupUser() {
        this.loader = true;
        this.errors = [];
        this.authService.signupUser(this.signupForm.value).subscribe({
            next: (result) => {
                this.loader = false;
                this.router.navigate(['/login']);
            },
            error: (error) => {
                this.loader = false;
                this.signupForm.get('password')?.reset();
                this.errors.push(error.message);
            },
        });
    }
}
