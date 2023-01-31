import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}
    baseURL = environment.apiUrl;

    signupUser(user: any) {
        return this.http.post(this.baseURL + 'auth/register/', user);
    }

    loginUser(user: any) {
        return this.http.post(this.baseURL + 'auth/login/', user);
    }

    getUserDetail() {
        return this.http.get(this.baseURL + 'user');
    }

    logoutUser() {
        localStorage.removeItem('auth_token');
    }

    setToken(token: string) {
        localStorage.setItem('auth_token', token);
    }

    getToken() {
        return localStorage.getItem('auth_token');
    }

    isAuthenticated() {
        return !!this.getToken();
    }
}
