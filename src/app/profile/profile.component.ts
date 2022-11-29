import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { AuthService } from "../auth.service";

@Component({
  selector: "app-userdetail",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService, private title: Title) {}

  user: any;
  ngOnInit() {
    this.title.setTitle("Profile | Angular-NoteApp");
    this.getUserDetail();
  }

  getUserDetail() {
    this.authService.getUserDetail().subscribe((result: any) => {
      this.user = result.data;
    });
  }
}
