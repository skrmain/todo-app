import { Component, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-password-control',
    template: `
        <div class="form-group mt-2">
            <label for="password" class="form-label">Password</label>
            <input
                type="password"
                id="password"
                class="form-control"
                formControlName="password"
                [ngClass]="{ 'is-invalid': password?.touched && password?.errors, 'is-valid': password?.touched && !password?.errors }"
            />
            <div *ngIf="password?.touched">
                <span class="invalid-feedback" *ngIf="password?.errors?.['required']">Required</span>
                <span class="invalid-feedback" *ngIf="password?.errors?.['minlength'] || password?.errors?.['maxlength']">
                    Length must be between 6 and 30.
                </span>
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
export class PasswordControlComponent {
    parentContainer = inject(ControlContainer);
    get parentFormGroup() {
        return this.parentContainer.control as FormGroup;
    }

    ngOnInit() {
        this.parentFormGroup.addControl('password', new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]));
    }

    get password() {
        return this.parentFormGroup.get('password');
    }
}
