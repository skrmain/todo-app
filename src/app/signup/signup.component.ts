import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  signupform = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(3)]],
    userPic: ["", [Validators.required]]
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle("SignUp | TodoApp");
  }

  // run when file field changes
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.signupform.get("userPic").setValue(file);
    }
  }

  // to call the addUser Service
  signupUser() {
    let user = this.signupform.value;
    let formData = new FormData();

    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("userPic", user.userPic);

    this.authService.signupUser(formData).subscribe(result => {
      this.router.navigate(["/login"]);
    });
  }
}
