import { Injectable } from '@angular/core';

import { SearchUser, UserProfile } from '../types/common.types';

import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private httpService: HttpService) {}

    getUserDetail() {
        return this.httpService.getData<UserProfile>('/users/me');
    }

    searchUser(username: string) {
        return this.httpService.getData<SearchUser[]>('/users/search/?username=' + username);
    }
}
