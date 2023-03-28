import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    errors: string[] = [];
    protected loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.maxLength(30)]],
    });

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private title: Title) {}

    ngOnInit() {
        this.title.setTitle('Login | Angular-TodoApp');
    }

    loginUser() {
        this.errors = [];
        this.authService.loginUser(this.loginForm.value).subscribe(
            (result: any) => {
                if (result.data.token) {
                    this.authService.setToken(result.data.token);
                    this.router.navigate(['/']);
                } else {
                    this.errors.push('Something happen wrong try again.');
                    this.loginForm.reset();
                }
            },
            (error) => {
                this.loginForm.get('password')?.reset();
                this.errors.push(error.message);
            }
        );
    }

    public get email() {
        return this.loginForm.get('email');
    }

    public get password() {
        return this.loginForm.get('password');
    }
}
