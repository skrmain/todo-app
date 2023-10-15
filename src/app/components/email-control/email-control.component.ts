import { Component, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-email-control',
    template: `
        <div class="form-group mt-2">
            <label for="email" class="form-label">Email</label>
            <input
                type="email"
                id="email"
                class="form-control"
                [ngClass]="{ 'is-invalid': email?.touched && email?.errors, 'is-valid': email?.touched && !email?.errors }"
                formControlName="email"
            />
            <div *ngIf="email?.touched">
                <span class="invalid-feedback" *ngIf="email?.errors?.['required']">Required</span>
                <span class="invalid-feedback" *ngIf="email?.errors?.['email']">Invalid Email</span>
            </div>
        </div>
    `,
    styles: [],
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: () => inject(ControlContainer, { skipSelf: true }),
        },
    ],
})
export class EmailControlComponent {
    parentContainer = inject(ControlContainer);
    get parentFormGroup() {
        return this.parentContainer.control as FormGroup;
    }

    ngOnInit() {
        this.parentFormGroup.addControl('email', new FormControl('', [Validators.required, Validators.email]));
    }

    get email() {
        return this.parentFormGroup.get('email');
    }
}
