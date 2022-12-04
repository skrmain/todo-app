import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private title: Title
  ) {}

  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
  });
  ngOnInit() {
    this.title.setTitle("Login | Angular-TodoApp");
  }

  loginUser() {
    this.authService
      .loginUser(this.loginForm.value)
      .subscribe((result: any) => {
        if (result.data.token) {
          localStorage.setItem("auth_token", result.data.token);
          this.router.navigate(["/"]);
        } else {
          alert("Error in Login");
          this.loginForm.reset();
        }
      });
  }
}
