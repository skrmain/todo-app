import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
})
export class NavbarComponent {
    title = document.title;

    constructor(private router: Router, private authService: AuthService) {}

    // TODO: check is there any side-effect of using this
    // NOTE: function so that on state change it can be checked if user is authenticated or not
    isAuthenticated() {
        return this.authService.isAuthenticated();
    }

    logoutUser() {
        this.authService.logoutUser();
        this.router.navigate(['/login']);
    }
}
