import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-userdetail",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private title: Title
  ) {}

  baseUrl = "http://localhost:3000/pic/";

  user: any;
  ngOnInit() {
    this.title.setTitle("Profile | TodoApp");
    this.getUserDetail();
  }

  getUserDetail() {
    this.authService.getUserDetail().subscribe(user => {
      console.log("User : ", user);
      this.user = user;
    });
  }

  deleteUser(userId) {
    let response = confirm("Do You really want to Delete Account?");
    if (response) {
      this.authService.deleteUser(userId).subscribe(result => {
        this.authService.logoutUser();
        alert("Account Deleted");
        this.router.navigate(["/login"]);
      });
    }
  }
}
