import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponse, SearchUser, UserProfile } from '../types/common.types';

import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private httpService: HttpService) {}

    getUserDetail(): Observable<ApiResponse<UserProfile>> {
        return this.httpService.getData('users/me');
    }

    searchUser(username: string): Observable<ApiResponse<SearchUser[]>> {
        return this.httpService.getData('users/search/?username=' + username);
    }
}
