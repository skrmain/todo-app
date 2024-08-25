import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-submit-button',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <p class="text-center mt-5">
            <button type="submit" class="btn btn-primary" [disabled]="invalid || loader">
                {{ label }}
                <span *ngIf="loader" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </button>
        </p>
    `,
    styles: [],
})
export class SubmitButtonComponent {
    @Input() loader = false;
    @Input() invalid = true;
    @Input() label?: string;
}
