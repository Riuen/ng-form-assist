import { AbstractControl } from "@angular/forms";

/**
 * Removes the specified error from the form control passed.
 * @param errorName Name of the error to remove
 * @param control Form control
 */
export function removeFormControlError(errorName: string, control: AbstractControl): void {
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
 * Appends an error to a form control
 * @param control 
 * @param errorName
 * @param errorMessage
 */
export function appendFormControlError(control: AbstractControl, errorName: string, errorMessage: string): void {
  if (!control || (control.hasError(errorName))) {
    return;
  }

  control.setErrors({
    ...control.errors,
    ... { [errorName]: errorMessage }
  });
}
