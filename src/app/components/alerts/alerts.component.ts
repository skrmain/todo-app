import { Component, inject } from '@angular/core';

import { AlertService } from '../../services/alerts.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-alerts',
    standalone: true,
    imports: [CommonModule],
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
    readonly alertService = inject(AlertService);
    constructor() {
        this.alertService.alerts$.subscribe({
            next: (value) => {
                this.errors?.push(value);
            },
            error: (error) => {
                console.log('Alert Error', error);
            },
        });
    }
}
