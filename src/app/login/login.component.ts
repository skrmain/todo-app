import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private title: Title
  ) {}

  loginform = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
  });
  ngOnInit() {
    this.title.setTitle("Login | TodoApp");
  }

  loginUser() {
    this.authService
      .loginUser(this.loginform.value)
      .subscribe((result: any) => {
        if (result.data.token) {
          localStorage.setItem("token", result.data.token);
          this.router.navigate(["/"]);
        } else {
          alert("Error in Login");
          this.loginform.reset();
        }
      });
  }
}
