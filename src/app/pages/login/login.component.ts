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
    protected loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.maxLength(30)]],
    });

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private title: Title) {}

    ngOnInit() {
        this.title.setTitle('Login | Angular-TodoApp');
    }

    loginUser() {
        this.authService.loginUser(this.loginForm.value).subscribe(
            (result: any) => {
                if (result.data.token) {
                    this.authService.setToken(result.data.token);
                    this.router.navigate(['/']);
                } else {
                    alert('Error in Login');
                    this.loginForm.reset();
                }
            },
            (error) => {
                // TODO: handle error
                console.log('Error', error);
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
