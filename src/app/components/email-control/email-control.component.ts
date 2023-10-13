import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-email-control',
    templateUrl: './email-control.component.html',
    styles: [],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EmailControlComponent),
            multi: true,
        },
    ],
})
export class EmailControlComponent implements ControlValueAccessor {
    form: FormGroup<{ email: FormControl<string | null> }>;
    constructor(formBuilder: FormBuilder) {
        this.form = formBuilder.group({
            email: [''],
        });
    }
    value = '';
    onChange = (_: any) => {};
    onTouched = () => {};

    public get email() {
        return this.form.get('email');
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
        this.onChange(this.email?.value);
    }
}
