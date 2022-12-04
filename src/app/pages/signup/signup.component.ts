import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
})
export class SignupComponent implements OnInit {
  signupForm = this.fb.group({
    username: ["", [Validators.required, Validators.minLength(3)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle("SignUp | Angular-TodoApp");
  }

  signupUser() {
    this.authService.signupUser(this.signupForm.value).subscribe((result) => {
      this.router.navigate(["/login"]);
    });
  }
}
