import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private httpService: HttpService) {}

    signupUser(user: any) {
        return this.httpService.sendData('register', user);
    }

    loginUser(user: any) {
        return this.httpService.sendData('login', user);
    }

    getUserDetail() {
        return this.httpService.getData('users/me');
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
