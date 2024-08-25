import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-password-control',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="form-group mt-2">
            <label for="password" class="form-label">Password</label>
            <div class="input-group">
                <input
                    id="password"
                    [type]="isPassword ? 'password' : 'text'"
                    class="form-control"
                    formControlName="password"
                    [ngClass]="{
                        'is-invalid': password?.touched && password?.errors,
                        'is-valid': password?.touched && !password?.errors
                    }"
                />
                <button class="input-group-text btn btn-primary" type="button" (click)="togglePassword()">
                    <i *ngIf="!isPassword" class="bi bi-eye-fill"></i>
                    <i *ngIf="isPassword" class="bi bi-eye-slash-fill"></i>
                </button>
            </div>
            <div *ngIf="password?.touched">
                <span class="invalid-feedback" *ngIf="password?.errors?.['required']">Required</span>
                <span
                    class="invalid-feedback"
                    *ngIf="password?.errors?.['minlength'] || password?.errors?.['maxlength']"
                >
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
    isPassword = true;

    togglePassword() {
        this.isPassword = !this.isPassword;
    }

    get parentFormGroup() {
        return this.parentContainer.control as FormGroup;
    }

    ngOnInit() {
        this.parentFormGroup.addControl(
            'password',
            new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)])
        );
    }

    get password() {
        return this.parentFormGroup.get('password');
    }
}
