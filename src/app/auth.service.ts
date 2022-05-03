import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}
  baseURL = "http://localhost:3000/";

  // add new user
  signupUser(user) {
    return this.http.post(this.baseURL + "user/signup", user);
  }

  // login user
  loginUser(user) {
    return this.http.post(this.baseURL + "user/login", user);
  }

  // get user detail
  getUserDetail() {
    return this.http.get(this.baseURL + "user");
  }

  // delete user account
  deleteUser(userId) {
    return this.http.delete(this.baseURL + "user/" + userId);
  }

  // logout user
  logoutUser() {
    localStorage.removeItem("token");
    return true;
  }

  // send the token
  getToken() {
    return localStorage.getItem("token");
  }

  // check token exists or Not
  isLoggedIn() {
    return !!localStorage.getItem("token");
  }
}
