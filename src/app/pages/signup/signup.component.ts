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
    protected signupForm = this.fb.group({});
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
}
