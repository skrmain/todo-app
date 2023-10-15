import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-alerts',
    template: `
        <div class="alert alert-danger alert-dismissible fade show" role="alert" *ngFor="let error of errors">
            {{ error }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `,
    styles: [],
})
export class AlertsComponent {
    @Input() errors?: string[];
}
