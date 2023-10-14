import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    errors: string[] = [];
    protected loginForm = this.fb.group({});

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private title: Title) {}

    ngOnInit() {
        this.title.setTitle('Login | Angular-TodoApp');
    }

    loginUser() {
        this.errors = [];
        this.authService.loginUser(this.loginForm.value).subscribe({
            next: (result: any) => {
                if (result.data.token) {
                    this.authService.setToken(result.data.token);
                    this.router.navigate(['/']);
                } else {
                    this.errors.push('Something happen wrong try again.');
                    this.loginForm.reset();
                }
            },
            error: (error) => {
                this.loginForm.get('password')?.reset();
                this.errors.push(error.message);
            },
        });
    }
}
