import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
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
