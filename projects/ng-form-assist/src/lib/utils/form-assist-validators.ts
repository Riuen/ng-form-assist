import { AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

export class FormAssistValidators {

  /**
   * Validate that the field is non empty.
   * @param message The error message to be displayed.
   */
  public static required(message: string): ValidatorFn {

    const validatorFn = (control: AbstractControl) => {

      const result = Validators.required(control);

      return (result)
        ? { _required: message || 'This field is required.' }
        : null;
    };

    return validatorFn;
  }

  /**
   * @description
   * Validator that requires the control's value to be greater than or equal to the provided number.
   * @param message The error message to be displayed. (Optional)
   */
  public static min(value: number, message?: string): ValidatorFn {

    const validatorFn = (control: AbstractControl) => {

      const fn = Validators.min(value);
      const error = fn(control);

      return (error)
        ? { _min: message || `Value must be greater than or equal to ${error.min.min}.` }
        : null;
    };

    return validatorFn;
  }

  /**
   * @description
   * Validator that requires the control's value to be less than or equal to the provided number.
   * @param message The error message to be displayed. (Optional)
   */
  public static max(value: number, message?: string): ValidatorFn {

    const validatorFn = (control: AbstractControl) => {

      const fn = Validators.max(value);
      const error = fn(control);

      return (error)
        ? { _max: message || `Value must be less than or equal to ${error.max.max}.` }
        : null;
    };

    return validatorFn;
  }

  /**
   * @description
   * Validator that requires the length of the control's value to be less than or equal to the provided number.
   * @param message The error message to be displayed. (Optional)
   */
  public static maxLength(value: number, message?: string): ValidatorFn {

    const validatorFn = (control: AbstractControl) => {

      const fn = Validators.maxLength(value);
      const error = fn(control);

      return (error)
        ? { _maxlength: message || `Value entered must be less than or equal to ${error.maxlength.requiredLength} characters.` }
        : null;
    };

    return validatorFn;
  }


  /**
   * @description
   * Validator that requires the length of the control's value to be greater than or equal to the provided number.
   * @param message The error message to be displayed. (Optional)
   */
  public static minLength(value: number, message?: string): ValidatorFn {

    const validatorFn = (control: AbstractControl) => {

      const fn = Validators.minLength(value);
      const error = fn(control);

      return (error)
        ? { _minlength: message || `Value entered must be greater than or equal to ${error.minlength.requiredLength} characters.` }
        : null;
    };

    return validatorFn;
  }

  /**
   * Validator that requires the control's value to match a regex pattern.
   * @param pattern The regex pattern to match against
   * @param message The error message to be displayed. (Optional)
   */
  public static pattern(pattern: string | RegExp, message?: string): ValidatorFn {

    const validatorFn = (control: AbstractControl) => {

      const fn = Validators.pattern(pattern);
      const error = fn(control);

      return (error)
        ? { _pattern: message || 'Invalid input.' }
        : null;
    };

    return validatorFn;
  }

  /**
   * Validator that requires the control's value pass an email validation test.
   * @param message The error message to be displayed.
   */
  public static email(message: string): ValidatorFn {

    const validatorFn = (control: AbstractControl) => {

      const error = Validators.email(control);

      return (error)
        ? { _email: message || 'Invalid email.' }
        : null;
    };

    return validatorFn;
  }

  /**
   * Validator that requires that the control value for both fields specified are equal.
   * Typically used to confirm if password fields match.
   * Note: Both fields must be of the same data type for accurate matching.
   * @param field1 The form control name for field 1.
   * @param field2 The form control name for field 2.
   * @param message The error message to be displayed. (Optional)
   */
  public static fieldMatch(field1: string, field2: string, message?: string): ValidatorFn {

    const validatorFn = (fg: FormGroup) => {

      message = message || `Value for ${field1} does not match ${field2}.`;

      const f1Control = fg.get(field1);
      const f2Control = fg.get(field2);

      if (f1Control?.value && f2Control?.value) {

        if (f1Control.value !== f2Control.value) {

          this.addErrors({ fieldMatch: message }, f1Control, 'fieldMatch');
          this.addErrors({ fieldMatch: message }, f2Control, 'fieldMatch');
          return { fieldMatch: message };
        }
        else {

          this.removeErrors('fieldMatch', f1Control);
          this.removeErrors('fieldMatch', f2Control);
          return null;
        }
      }
    };

    return validatorFn;
  }

  /**
   * Validator that requires the control's value to contain atleast 1 lowercase, uppercase,
   * digit and special character.
   * @param message The error message to be displayed.
   */
  public static passwordComplexity(message: string): ValidatorFn {

    const validatorFn = (control: AbstractControl) => {

      message = message || 'Password must contain atleast 1 lowercase, uppercase, digit and a special character.';
      const password = control.value as string;

      if (password) {

        // Password contains atleast 1 lowercase
        if (!password.match(/^.*[a-z].*$/)) {
          return { passwordComplexity: message };
        }

        // Password contains atleast 1 uppercase
        if (!password.match(/^.*[A-Z].*$/)) {
          return { passwordComplexity: message };
        }

        // Password contains atleast 1 number
        if (!password.match(/^.*\d.*$/)) {
          return { passwordComplexity: message };
        }

        // Password contains atleast 1 special character
        if (!password.match(/^.*(\W|_).*$/)) {
          return { passwordComplexity: message };
        }
      }

      return null;
    };

    return validatorFn;
  }

  /**
   * Date validator which validates that the control's value is a date that occurs after the date specified.
   * Note: For best results ensure that the control's value is of type date
   * or date string.
   * @param date The date to compare against.
   */
  public static dateAfter(date: Date | string, message?: string): ValidatorFn {

    const validatorFn = (control: AbstractControl) => {

      if (control.value) {

        const dateStr = new Date(date).toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'});
        const referenceDate = Date.parse(dateStr);
        const controlDate = Date.parse(control.value);
        message = message || `Date entered must be greater than ${dateStr}.`;
        const enteredDate = controlDate > 0 ? controlDate : 0;

        return (enteredDate > referenceDate)
          ? null
          : { dateAfter: message };
      }
      return null;
    };

    return validatorFn;
  }

  /**
   * Date validator which validates that the control's value is a
   * date that occurs before the date specified.
   * Note: For best results ensure that the control's value is of type date
   * or date string.
   * @param date The date to compare against.
   */
  public static dateBefore(date: Date | string, message?: string): ValidatorFn {

    const validatorFn = (control: AbstractControl) => {

      if (control.value) {

        const dateStr = new Date(date).toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'});
        const referenceDate = Date.parse(dateStr);
        const controlDate = Date.parse(control.value);
        message = message || `Date entered must be less than ${dateStr}.`;
        const enteredDate = controlDate > 0 ? controlDate : 0;

        return (enteredDate < referenceDate)
          ? null
          : { dateBefore: message };
      }
      return null;
    };

    return validatorFn;
  }


  private static removeErrors(errorName: string, control: AbstractControl) {
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

  private static addErrors(errors: { [key: string]: any }, control: AbstractControl, errorName: string) {
    if (!control || !errors || (control.hasError(errorName))) {
      return;
    }

    control.setErrors({ ...control.errors, ...errors });
  }
}

