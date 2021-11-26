import { AbstractControl } from "@angular/forms";

/**
 * Removes the specified error from the form control passed.
 * @param errorName Name of the error to remove
 * @param control Form control
 */
export function removeErrorFromFormControl(errorName: string, control: AbstractControl): void {
  if (!control || !errorName || (!control.hasError(errorName))) {
    return;
  }

  const remainingErrors = control.errors;
  delete remainingErrors[errorName];

  control.setErrors(remainingErrors);

  if (Object.keys(control.errors || {}).length === 0) {
    control.setErrors(null);
  }
}

/**
 * Adds error objects to the passed form control.
 * @param errors Error objects to add to form control
 * @param control Form control
 * @param errorName 
 */
export function addErrorToFormControl(errors: { [key: string]: any }, control: AbstractControl, errorName: string): void {
  if (!control || !errors || (control.hasError(errorName))) {
    return;
  }

  control.setErrors({ ...control.errors, ...errors });
}