# NgFormAssist

## Warning experimental!

## Basic Overview
This project is intended to add some utilities to forms created in angular, be it reactive or template driven. This project current provides two main utilities:
1. A directive to handle basic tasks (smartFormField)
2. Additional validators.

### Smart Field Directive (smartFormField)
This directive essentially makes the field it is bound to aware of the validators registered to it, as such this directive automatically handles the following tasks:
1. Changing the css class of the field to reflect if an error is present.
2. Displaying of error messages under fields when a validation rule is violated.
3. Triming of values if the input is of type `string`
4. If a field contains empty string, the value will be converted to null.

### Custom Validators
This library exports a number of additional validators that you can import and use in your form group. Currently the validators available are:
1. Date entered is less than or equal to current date
2. Date entered is greater than or equal to current date
3. Password Match (Checks that the value in the specified password and confirm password fields match)
4. Password complexity (Password must be greater than 6 characters and contain atleast 1 uppercase, digit and special character)

## Basic Usage
Import the `FormAssistModule` simply attach the `smartFormField` directive to any form field.


## Vision / TODO
* Add more comprehensive documentation and examples.
* Add more validators.
* Refactor to allow the following to be configurable by the user:
    * Password complexity rules.
    * The css class that must be applied to the field on error.
    * Enable/Disable the trim feature.
    * Enable/Disable the conversion of empty fields to null.
* Add tests
* Allow users to override any default error message (globally or in a specific instance).
* Create demo
