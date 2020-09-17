import { AbstractControl, FormGroup } from '@angular/forms';

/*
    A class to store custom reusable form validation functions.
*/

export class CustomValidators {

    public static validateDateGreaterThanNow(fc: AbstractControl) {

      if (fc.value) {

        const parsedDate = Date.parse(fc.value);
        const enteredDate = parsedDate > 0 ? parsedDate : 0;
        const currentDate = new Date();

        return (enteredDate > currentDate.getTime())
          ? null
          : { validateDateGreaterThanNow: { valid: false } };
      }
      return null;
    }

    public static validateDateLessThanNow(fc: AbstractControl) {

      if (fc.value) {

        const parsedDate = Date.parse(fc.value);
        const enteredDate = parsedDate > 0 ? parsedDate : 0;
        const currentDate = new Date();

        return (enteredDate < currentDate.getTime())
          ? null
          : { validateDateLessThanNow: { valid: false } };
      }
      return null;
    }

    public static validatePasswordMatch(passwordField: string, confirmPasswordField: string) {

      return (fg: FormGroup) => {

        const passwordCtrl = fg.get(passwordField);
        const confirmPasswordCtrl = fg.get(confirmPasswordField);

        if (passwordCtrl && confirmPasswordCtrl) {

          if (passwordCtrl.value !== confirmPasswordCtrl.value) {
            confirmPasswordCtrl.setErrors({ validatePasswordMatch: { valid: false }});
            return null;
          }
          else {
            confirmPasswordCtrl.setErrors(null);
          }
        }
      };

      // return null;
  }

    public static validateLoginName(fc: AbstractControl) {

        if (fc.value) {
          return (fc.value as string).match(/^[a-z]([a-z0-9]*(-|_|.){0,1}[a-z0-9]+)+$/)
            ? null
            : { validateLoginName: 'Login name may only begin with a lowercase letter and can only contain: Letters, \
                numbers, hypens, periods and underscore'};
        }
    }

    public static validatePasswordComplexity(fieldCtrl: AbstractControl) {

        const password = fieldCtrl.value as string;

        if (password) {

          // Password contains atleast 1 lowercase
          if (!password.match(/^.*[a-z].*$/)) {
            return { validatePasswordComplexity_Lowercase: {valid: false}};
          }

          // Password contains atleast 1 uppercase
          if (!password.match(/^.*[A-Z].*$/)) {
            return { validatePasswordComplexity_Uppercase: {valid: false}};
          }

          // Password contains atleast 1 number
          if (!password.match(/^.*\d.*$/)) {
            return { validatePasswordComplexity_Numeric: {valid: false}};
          }

          // Password contains atleast 1 special character
          if (!password.match(/^.*\W.*$/)) {
            return { validatePasswordComplexity_Special: {valid: false}};
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
        : { validateCustomPattern: 'Login name may only begin with a lowercase letter and can only contain: Letters, \
            numbers, hypens, periods and underscore'};
      };
    }
}
