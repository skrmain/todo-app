import { Component, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-username-control',
    template: `
        <div class="form-group" [formGroup]="form">
            <label for="username" class="form-label">Username</label>
            <input
                id="username"
                class="form-control"
                [ngClass]="{ 'is-invalid': username?.touched && username?.errors, 'is-valid': username?.touched && !username?.errors }"
                formControlName="username"
                (input)="valueChanged()"
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
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UsernameControlComponent),
            multi: true,
        },
    ],
})
export class UsernameControlComponent {
    form: FormGroup<{ username: FormControl<string | null> }>;
    constructor(formBuilder: FormBuilder) {
        this.form = formBuilder.group({
            username: [''],
        });
    }
    value = '';
    onChange = (_: any) => {};
    onTouched = () => {};

    public get username() {
        return this.form.get('username');
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
        this.onChange(this.username?.value);
    }
}
