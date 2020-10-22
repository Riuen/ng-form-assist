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
        <p *ngIf="fieldControl.touched" class="text-danger">
            {{ errorMessage}}
        </p>
    `,
    styles: [
    ]
})
export class FieldErrorViewComponent {

    @Input()
    public errorMessage: string = null;

    @Input()
    public fieldControl: NgControl;


    constructor() { }
}
