import { Component, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Input:
 *  - Array consisting of error names and associated error messages
 * Purpose:
 *  This component will render the relevant error message based on the errors
 *  present in the form control.
 */

@Component({
    selector: 'lib-field-error-view',
    template: `
        <div *ngIf="fieldControl.touched" [class]="fieldClass">
            {{ errorMessage}}
        </div>
    `,
    styles: [
    ]
})
export class FieldErrorViewComponent {

    @Input()
    public errorMessage: string = null;

    @Input()
    public fieldControl: NgControl;

    @Input()
    public fieldClass: string;


    constructor() { }
}
