import { Component } from '@angular/core';

import { AlertService } from '../../services/alerts.service';

@Component({
    selector: 'app-alerts',
    template: `
        <div class="alert-container position-absolute">
            <div class="alert alert-danger alert-dismissible fade show" role="alert" *ngFor="let error of errors">
                {{ error }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
    `,
    styles: [
        `
            .alert-container {
                z-index: 1030;
                left: 50%;
                transform: translate(-50%, 0);
                top: 2rem;
            }
        `,
    ],
})
export class AlertsComponent {
    errors?: string[] = [];
    constructor(readonly alertService: AlertService) {
        alertService.alerts$.subscribe({
            next: (value) => {
                this.errors?.push(value);
            },
            error: (error) => {
                console.log('Alert Error', error);
            },
        });
    }
}
