import { AbstractControl, FormGroup } from '@angular/forms';

/*
  A class to store custom reusable form validation functions.
*/

export class FormAssistValidators {

  public static dateGreaterThanNow() {

    return (fc: AbstractControl) => {

      if (fc.value) {

        const parsedDate = Date.parse(fc.value);
        const enteredDate = parsedDate > 0 ? parsedDate : 0;
        const currentDate = new Date();

        return (enteredDate > currentDate.getTime())
          ? null
          : { dateLessThanNow: true };
      }
      return null;
    };
  }

  public static dateLessThanNow() {

    return (fc: AbstractControl) => {

      if (fc.value) {

        const parsedDate = Date.parse(fc.value);
        const enteredDate = parsedDate > 0 ? parsedDate : 0;
        const currentDate = new Date();

        return (enteredDate < currentDate.getTime())
          ? null
          : { dateLessThanNow: true };
      }
      return null;
    };
  }

  public static passwordMatch(passwordField: string, confirmPasswordField: string) {

    return (fg: FormGroup) => {

      const passwordCtrl = fg.get(passwordField);
      const confirmPasswordCtrl = fg.get(confirmPasswordField);

      if (passwordCtrl?.value && confirmPasswordCtrl?.value) {

        if (passwordCtrl.value !== confirmPasswordCtrl.value) {
          this.addErrors({ passwordMatch: true }, passwordCtrl);
          this.addErrors({ passwordMatch: true }, confirmPasswordCtrl);
          return null;
        }
        else {
          this.removeErrors(['passwordMatch'], passwordCtrl);
          this.removeErrors(['passwordMatch'], confirmPasswordCtrl);
          return null;
        }
      }
    };

    // return null;
  }

  public static passwordComplexity(fieldCtrl: AbstractControl) {

    const password = fieldCtrl.value as string;

    if (password) {

      // Password contains atleast 1 lowercase
      if (!password.match(/^.*[a-z].*$/)) {
        return { passwordComplexity_Lowercase: true };
      }

      // Password contains atleast 1 uppercase
      if (!password.match(/^.*[A-Z].*$/)) {
        return { passwordComplexity_Uppercase: true };
      }

      // Password contains atleast 1 number
      if (!password.match(/^.*\d.*$/)) {
        return { passwordComplexity_Numeric: true };
      }

      // Password contains atleast 1 special character
      if (!password.match(/^.*(\W|_).*$/)) {
        return { passwordComplexity_Special: true };
      }
    }

    return null;
  }

  public static username(fc: AbstractControl) {

    if (fc.value) {

      return (fc.value as string).match(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/)
        ? null
        : { username: { valid: false } };
    }
  }

  public static pattern(pattern: string) {

    return (fc: AbstractControl) => {

      if (!fc.value) {
        return null;
      }

      return (fc.value as string).match(pattern)
        ? null
        : {
          username: { valid: false }
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
}
