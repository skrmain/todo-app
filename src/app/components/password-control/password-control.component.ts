import { Component, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-password-control',
    template: `
        <div class="form-group mt-2" [formGroup]="form">
            <label for="password" class="form-label">Password</label>
            <input
                type="password"
                id="password"
                class="form-control"
                formControlName="password"
                [ngClass]="{ 'is-invalid': password?.touched && password?.errors, 'is-valid': password?.touched && !password?.errors }"
                (input)="valueChanged()"
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
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PasswordControlComponent),
            multi: true,
        },
    ],
})
export class PasswordControlComponent {
    form: FormGroup<{ password: FormControl<string | null> }>;
    constructor(formBuilder: FormBuilder) {
        this.form = formBuilder.group({
            password: [''],
        });
    }
    value = '';
    onChange = (_: any) => {};
    onTouched = () => {};

    public get password() {
        return this.form.get('password');
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(obj: any): void {
        this.value = obj;
    }

    valueChanged() {
        this.onChange(this.password?.value);
    }
}
