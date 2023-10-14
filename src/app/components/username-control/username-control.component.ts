import { Component, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-username-control',
    template: `
        <div class="form-group">
            <label for="username" class="form-label">Username</label>
            <input
                id="username"
                class="form-control"
                [ngClass]="{ 'is-invalid': username?.touched && username?.errors, 'is-valid': username?.touched && !username?.errors }"
                formControlName="username"
            />
            <div *ngIf="username?.touched">
                <span class="invalid-feedback" *ngIf="username?.errors?.['required']">Required</span>
                <span class="invalid-feedback" *ngIf="username?.errors?.['minlength'] || username?.errors?.['maxlength']">
                    Length must be between 5 and 20.
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
export class UsernameControlComponent {
    parentContainer = inject(ControlContainer);
    get parentFormGroup() {
        return this.parentContainer.control as FormGroup;
    }

    ngOnInit() {
        this.parentFormGroup.addControl('username', new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]));
    }

    get username() {
        return this.parentFormGroup.get('username');
    }
}
