import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

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

      if (passwordCtrl && confirmPasswordCtrl) {

        if (passwordCtrl.value !== confirmPasswordCtrl.value) {
          confirmPasswordCtrl.setErrors({ validatePasswordMatch: true });
          return null;
        }
        else {
          confirmPasswordCtrl.setErrors(null);
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
      if (!password.match(/^.*\W.*$/)) {
        return { validatePasswordComplexity_Special: true };
      }
    }

    return null;
  }

  public static validateCustomPattern(pattern: string) {

    return (fc: AbstractControl) => {

      if (!fc.value) {
        return null;
      }

      return (fc.value as string).match(pattern)
        ? null
        : {
          validateCustomPattern: { valid: false}};
    };
  }
}
