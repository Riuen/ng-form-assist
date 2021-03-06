# NgFormAssist

## Table Of Contents
- [Basic Overview](#basic-overview)
- [Basic Usage](#basic-usage)
    - [Example Implementation](#basic-example)
- [Customization](#customization)
- [Angular Validator Support](#angular-validator-support)
- [Form Assist Validators](#form-assist-validators)

<br/><br/>

## Basic Overview
This project is intended to add some utilities to reactive forms created in angular. This project current provides two main utilities:
1. A directive to handle basic tasks (smartFormField)
2. Additional validators.


### Smart Field Directive (smartFormField)
This directive essentially makes the field it is bound to aware of the validators registered to it, that being said, this directive automatically handles the following tasks:
1. Changing the css class of the field to reflect if an error is present.
2. Displaying of error messages under fields when a validation rule is violated.
3. Triming of values if the input is of type `string`. (This can be disabled)
4. If a field contains empty string, the value will be converted to null. (This can be disabled)

<br/>


## Basic Usage
Import the `FormAssistModule` into the module where you wish to use it.
```
...
import { NgFormAssistModule } from 'ng-form-assist';


@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    NgFormAssistModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Then simply attach the `smartFormField` directive to any reactive form field. See [here](#basic-example) for an example. It is possible to configure the behaviour of the directive by passing an object of your custom configurations. Eg

```
import { NgFormAssistModule } from 'ng-form-assist';


@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    NgFormAssistModule.forRoot({
      applyTrim: true,
      displayValidationMessages: true,
      invalidFieldClass: 'is-invalid',
      ...
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
See [here](#customization) for a description of all supported configurations.

<br/>

## Angular Validator Support
This library supports the use of the validators offered out of the box by angular. A default validation message will be automatically displayed. See [Form Assist Validators](#form-assist-validators) 
to see how to customize them! Below are the default messages that will be displayed for each default angular validator:


| Validator | Default Message |
| --------- | --------------- |
| `required`  | This field is required. |
| `min`       | Value must be greater than or equal to `${MIN_VAL}`. |
| `max`       | Value must be less than or equal to `${MAX_VAL}`. |
| `maxLength` | Value entered must be less than or equal to `${MAX_LENGTH}` characters. |
| `minLength` | Value entered must be greater than or equal to `${MIN_LENGTH}` characters. |
| `pattern`   | Invalid Input. |
| `email`     | Invalid email. |

<br/>

## Customization
It is possible to customize the behavior of the smartFormField directive.

| Configuration               | Description                                    | Data Type | Default |
| --------------------------- | ---------------------------------------------- | ----------| --------|
| `applyTrim`                 | Trim the input for string data types.          | boolean   | true    |
| `displayValidationMessages` | Display validation messages whenever they are violated. __Note:__ messages are displayed when the validation has been broken and the field has been marked as touched. | string | true |
| `validationMessageClass`    | The styling class name (css, scss etc) that should be applied to the validation message. | string | null |    
| `invalidFieldClass`         | The styling class name (css, scss etc) that should be applied to the form field when it is in an error state. __Note:__ If no value is specified then this behaviour will be disabled. | string | null |
| `setBlankToNull`            | Convert the value of empty fields to null. | boolean | true |


<br/>

## Form Assist Validators
This library exports a number of additional validators that you can import and use in your form group. When
you use the Validators provided by this library, you will be able to supply the error message that
should be displayed. The built-in angular validators have been wrapped and is included in this class, using
these instead of the built-in angular validators will allow you to provide your own error messages (under the hood they implement the same logic).

<br/><br/>

### Validators
The custom validators are in a class called `FormAssistValidators`. Below are all the validators that are included:

#### `fieldMatch`
Validator that requires that the input for both fields specified are equal. The error message appear under the two fields specified.
Eg use-case: Validating that passwords match.\
__This validator must be added at the form group level.__\
*Note: Both fields must be of the same data type for accurate matching.*
- Default Message: *Value for `${field1}` does not match `${field2}`.*

| Parameter | Data type | Description                                    | Required |
| --------- | --------- | ---------------------------------------------- | -------- |
| field1    | `string`  | The form control name of field 1.              | `true`   |
| field2    | `string`  | The form control name of field 2.              | `true`   |
| message   | `string`  | The error message that should be displayed.    | `false`  |

<br/><hr/>

#### `passwordComplexity`
Validator that requires the control's value to contain atleast 1 lowercase, uppercase,
digit and special character.\
- Default Message: *Password must contain atleast 1 lowercase, uppercase, digit and a special character.*

| Parameter | Data type | Description                                    | Required |
| --------- | ----------| ---------------------------------------------- | -------- |
| message   | `string`  | The error message that should be displayed.    | `true`   |
>__*Note: pass a `null` value for the message parameter if you wish to use the default message.*__

<br/><hr/>

#### `dateAfter`
Date validator which validates that the input is a date that occurs after the date specified.\
Note: For best results ensure that the field input value is of type `Date` or a date `string`.
- Default Message: *Date entered must be greater than `${FORMATTED_DATE}`.*

| Parameter | Data type                     | Description                                    | Required |
| --------- | ----------------------------- | ---------------------------------------------- | -------- |
| date      | `Date` or valid date `string` | The date to compare the input against.         | `true`   |
| message   | `string`                      | The error message that should be displayed.    | `false`  |

<br/><hr/>

#### `dateBefore`
Date validator which validates that the input is a date that occurs before the date specified.\
Note: For best results ensure that the field input value is of type `Date` or a date `string`.
- Default Message: *Date entered must be greater than `${FORMATTED_DATE}`.*

| Parameter | Data type                     | Description                                    | Required |
| --------- | ----------------------------- | ---------------------------------------------- | -------- |
| date      | `Date` or valid date `string` | The date to compare the input against.         | `true`   |
| message   | `string`                      | The error message that should be displayed.    | `false`  |

<br/><hr/>

#### `required`
Validate that the field is non empty.
* Default Message: *This field is required.*

| Parameter | Data type | Description                                    | Required |
| --------- | ----------| ---------------------------------------------- | -------- |
| message   | `string`  | The error message that should be displayed.    | `true`   |  

> __*Note: pass a `null` value for the message parameter if you wish to use the default message.*__

<br/><hr/>

#### `min`
Validator that requires the input to be greater than or equal to the provided number.
- Default Message: *Value must be greater than or equal to `${MIN_VAL}`.*

| Parameter | Data type | Description                                    | Required |
| --------- | --------- | ---------------------------------------------- | -------- |
| value     | `number`  | The minimum accepted number                    | `true`   |
| message   | `string`  | The default message that should be displayed.  | `false`  |

<br/><hr/>

#### `max`
Validator that requires the input to be less than or equal to the provided number.
- Default Message: *Value must be less than or equal to `${MAX_VAL}`.*

| Parameter | Data type | Description                                    | Required |
| --------- | --------- | ---------------------------------------------- | -------- |
| value     | `number`  | The max accepted number                        | `true`   |
| message   | `string`  | The default message that should be displayed.  | `false`  |

<br/><hr/>

#### `maxLength`
Validator that requires the length of the input be less than or equal to the provided number.
- Default Message: *Value entered must be less than or equal to `${MAX_LENGTH}` characters.*

| Parameter | Data type | Description                                    | Required |
| --------- | --------- | ---------------------------------------------- | -------- |
| value     | `number`  | The maximum length                             | `true`   |
| message   | `string`  | The default message that should be displayed.  | `false`  |

<br/><hr/>

#### `minLength`
Validator that requires the length of the input be greater than or equal to the provided number.
- Default Message: *Value entered must be less than or equal to `${MIN_LENGTH}` characters.*

| Parameter | Data type | Description                                    | Required |
| --------- | ----------| ---------------------------------------------- | -------- |
| value     | `number`  | The minimum length                             | `true`   |
| message   | `string`  | The default message that should be displayed.  | `false`  |

<br/><hr/>

#### `pattern`
Validator that requires the length of the input be greater than or equal to the provided number.
- Default Message: *Invalid input.*

| Parameter | Data type            | Description                                    | Required |
| --------- | -------------------- | ---------------------------------------------- | -------- |
| pattern   | `string` or `RegExp` | The regex pattern to match against.            | `true`   |
| message   | `string`             | The error message that should be displayed.    | `false`  |

<br/><hr/>

#### `email`
Email validator
- Default Message: *Invalid email.*

| Parameter | Data type | Description                                    | Required |
| --------- | ----------| ---------------------------------------------- | -------- |
| message   | `string`  | The error message that should be displayed.    | `true`   |

>__*Note: pass a `null` value for the message parameter if you wish to use the default message.*__

<br/><hr/>

## Basic Example
In this example we will create a simple reactive form with 2 fields `firstName` and `lastName`. In order to demonstrate both the angular validators and the form assist validators, the first name field will use the built in angular `Validators` while the last name field will use the `FormAssistValidators`. I will also demonstrate how to add custom error messages.

1. Creating the reactive form group
```
const form = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    lastName: new FormControl('', [
        FormAssistValidators.required('Last name is required.'),
        FormAssistValidators.maxLength(30, 'Last name cannot exceed 30 characters.')
    ])
});
```
2. Creating the HTML form and attaching the directive
```
<form [formGroup]="form">
    <input type="text" formControlName="firstName" class="form-control" smartFormField />
    <input type="text" formControlName="lastName" class="form-control" smartFormField />
</form>
```

At this stage we are essentially finished with our form. Once a validation rule has been broken: the css class for invalid form fields will be applied to the field, and the error message will be displayed.

<br/><hr/>

## Vision / TODO
* Add more comprehensive documentation and examples.
* Add more validators.
* Add support for user defined validators.
* Add more tests.
* Create an interactive demo.
