export function extractMessage(errorName: string, error: any) {

    let message = null;

    if (error) {

        switch (errorName) {
            case 'required': message = 'This field is required.'; break;
            case 'minlength': message = `Value entered must be greater than or equal to ${error.requiredLength} characters.`; break;
            case 'maxlength': message = `Value entered must be less than or equal to ${error.requiredLength} characters.`; break;
            case 'pattern': message = 'Invalid input.'; break;
            case 'min': message = `Value must be greater than or equal to ${error.min}.`; break;
            case 'max': message = `Value must be less than or equal to ${error.max}.`; break;
            case 'email': message = `Invalid email address.`; break;
            default: message = error;
        }
    }

    return message;
}
