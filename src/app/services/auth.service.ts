import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}
  baseURL = environment.apiUrl;

  // add new user
  signupUser(user:any) {
    return this.http.post(this.baseURL + "auth/register/", user);
  }

  // login user
  loginUser(user:any) {
    return this.http.post(this.baseURL + "auth/login/", user);
  }

  // get user detail
  getUserDetail() {
    return this.http.get(this.baseURL + "user");
  }

  // logout user
  logoutUser() {
    localStorage.removeItem("auth_token");
    return true;
  }

  // send the token
  getToken() {
    return localStorage.getItem("auth_token");
  }

  // check token exists or Not
  isLoggedIn() {
    return !!localStorage.getItem("auth_token");
  }
}
