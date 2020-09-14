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

    public static validatePasswordMatch(password: string, confirmPassword: string) {

      return (fg: FormGroup) => {

        const passwordCtrl = fg.get(password);
        const confirmPasswordCtrl = fg.get(confirmPassword);

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

    public static validateEmail(fc: AbstractControl) {

        const email = fc.value as string;

        if (email) {

          return (email.match(/^[ ]*[^ @\t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+[ ]*$/))
            ? null
            : { validateEmail: {valid: false}};
        }

        return null;
    }

    public static validatePhoneNumber(fc: AbstractControl) {

        const phoneNumber = fc.value as string;

        if (phoneNumber) {

          return (phoneNumber.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/))
            ? null
            : { validateEmail: {valid: false}};
        }

        return null;
    }



    /* For cases where you may want to do your own validation from
        outside the component. Eg calling an API in order to validate some input;
        This validator exists as a sort of placeholder, you can specify a custom message
        and manually set the error in accordance with your logic to have the message displayed
        and error status of the field reflected
        TODO - Reword this hot garbage, possible rename function.
    */
    public static manualValidation(formCtrl: AbstractControl) {
        return formCtrl.hasError('manualValidation')
          ? { manualValidation: {valid: false} } : null;
    }

    public static removeManualValidationError(fieldCtrl: AbstractControl) {

        let fieldErrors = fieldCtrl.errors;

        if (fieldCtrl.errors) {
          delete fieldErrors?.manualValidation;
        }

        fieldErrors = (Object.keys(fieldErrors || {}).length >= 1) ? fieldErrors : null;
        fieldCtrl.setErrors(fieldErrors);
    }

    public static addManualValidationError(fieldCtrl: AbstractControl) {

        const fieldErrors = fieldCtrl.errors || {};
        fieldErrors.manualValidation = {valid: false};

        fieldCtrl.setErrors(fieldErrors);
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
}
