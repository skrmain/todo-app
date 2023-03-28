import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
    errors: string[] = [];
    protected signupForm = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
    });
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private title: Title) {}

    ngOnInit() {
        this.title.setTitle('SignUp | Angular-TodoApp');
    }

    signupUser() {
        this.errors = [];
        this.authService.signupUser(this.signupForm.value).subscribe({
            next: (result) => {
                this.router.navigate(['/login']);
            },
            error: (error) => {
                this.signupForm.get('password')?.reset();
                this.errors.push(error.message);
            },
        });
    }

    public get username() {
        return this.signupForm.get('username');
    }
    public get email() {
        return this.signupForm.get('email');
    }

    public get password() {
        return this.signupForm.get('password');
    }
}
