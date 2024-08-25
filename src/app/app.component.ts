import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { AlertsComponent } from './components/alerts/alerts.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [NavbarComponent, AlertsComponent, RouterOutlet],
    template: `
        <app-navbar></app-navbar>
        <app-alerts></app-alerts>

        <div class="container">
            <div class="row justify-content-center pt-5">
                <div class="col-12 col-sm-10 col-md-8 col-lg-6 pt-3">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    `,
})
export class AppComponent {}
