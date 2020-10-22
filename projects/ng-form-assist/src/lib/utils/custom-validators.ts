import { AbstractControl, FormGroup } from '@angular/forms';

/*
  A class to store custom reusable form validation functions.
*/

export class CustomValidators {

  public static validateDateGreaterThanNow() {

    return (fc: AbstractControl) => {

      if (fc.value) {

        const parsedDate = Date.parse(fc.value);
        const enteredDate = parsedDate > 0 ? parsedDate : 0;
        const currentDate = new Date();

        return (enteredDate > currentDate.getTime())
          ? null
          : { validateDateGreaterThanNow: true };
      }
      return null;
    };
  }

  public static validateDateLessThanNow() {

    return (fc: AbstractControl) => {

      if (fc.value) {

        const parsedDate = Date.parse(fc.value);
        const enteredDate = parsedDate > 0 ? parsedDate : 0;
        const currentDate = new Date();

        return (enteredDate < currentDate.getTime())
          ? null
          : { validateDateLessThanNow: true };
      }
      return null;
    };
  }

  public static validatePasswordMatch(passwordField: string, confirmPasswordField: string) {

    return (fg: FormGroup) => {

      const passwordCtrl = fg.get(passwordField);
      const confirmPasswordCtrl = fg.get(confirmPasswordField);

      if (passwordCtrl?.value && confirmPasswordCtrl?.value) {

        if (passwordCtrl.value !== confirmPasswordCtrl.value) {
          this.addErrors({ validatePasswordMatch: true }, passwordCtrl);
          this.addErrors({ validatePasswordMatch: true }, confirmPasswordCtrl);
          return null;
        }
        else {
          this.removeErrors(['validatePasswordMatch'], passwordCtrl);
          this.removeErrors(['validatePasswordMatch'], confirmPasswordCtrl);
          return null;
        }
      }
    };

    // return null;
  }

  public static validatePasswordComplexity(fieldCtrl: AbstractControl) {

    const password = fieldCtrl.value as string;

    if (password) {

      // Password contains atleast 1 lowercase
      if (!password.match(/^.*[a-z].*$/)) {
        return { validatePasswordComplexity_Lowercase: true };
      }

      // Password contains atleast 1 uppercase
      if (!password.match(/^.*[A-Z].*$/)) {
        return { validatePasswordComplexity_Uppercase: true };
      }

      // Password contains atleast 1 number
      if (!password.match(/^.*\d.*$/)) {
        return { validatePasswordComplexity_Numeric: true };
      }

      // Password contains atleast 1 special character
      if (!password.match(/^.*(\W|_).*$/)) {
        return { validatePasswordComplexity_Special: true };
      }
    }

    return null;
  }

  public static validateLoginName(fc: AbstractControl) {

    if (fc.value) {

      return (fc.value as string).match(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/)
        ? null
        : { validateLoginName: { valid: false } };
    }
  }

  public static validateCustomPattern(pattern: string) {

    return (fc: AbstractControl) => {

      if (!fc.value) {
        return null;
      }

      return (fc.value as string).match(pattern)
        ? null
        : {
          validateCustomPattern: { valid: false }
        };
    };
  }

  private static removeErrors(keys: string[], control: AbstractControl) {
    if (!control || !keys || keys.length === 0) {
      return;
    }

    const remainingErrors = keys.reduce((errors, key) => {
      delete errors[key];
      return errors;
    }, { ...control.errors });

    control.setErrors(remainingErrors);

    if (Object.keys(control.errors || {}).length === 0) {
      control.setErrors(null);
    }
  }

  private static addErrors(errors: { [key: string]: any }, control: AbstractControl) {
    if (!control || !errors) {
      return;
    }

    control.setErrors({ ...control.errors, ...errors });
  }

 /*  private static appendError(fc: AbstractControl, error: any): void {
    let fieldErrors = fc.errors;

    if (fieldErrors) {
      Object.assign(fieldErrors, error);
    }
    else {
      fieldErrors = error;
    }

    fc.setErrors(fieldErrors);
  }

  private static removeError(fc: AbstractControl, errorKey: string): void {

    let result = null;

    if (fc.errors) {
      const fieldErrors = fc.errors;
      delete fieldErrors[errorKey];
      result = Object.keys(fieldErrors).length > 0 ? fieldErrors : null;
    }
    else {
      fc.markAsPristine();
    }

    fc.setErrors(result);
  } */
}
