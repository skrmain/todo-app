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
    protected signupForm = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    });
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private title: Title) {}

    ngOnInit() {
        this.title.setTitle('SignUp | Angular-TodoApp');
    }

    signupUser() {
        this.authService.signupUser(this.signupForm.value).subscribe((result) => {
            this.router.navigate(['/login']);
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
