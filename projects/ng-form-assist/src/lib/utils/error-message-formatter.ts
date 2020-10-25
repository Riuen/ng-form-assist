/**
 * Returns the corresponding error message for the validator error.
 * @param errorName The name of the error.
 * @param error The error map returned from the form control validator.
 */
export function extractMessage(errorName: string, error: any): string {

    switch (errorName) {
        case 'required': return 'This field is required.';
        case 'minlength': return `Value entered must be greater than or equal to ${error.requiredLength} characters.`;
        case 'maxlength': return `Value entered must be less than or equal to ${error.requiredLength} characters.`;
        case 'pattern': return 'Invalid input.';
        case 'min': return `Value must be greater than or equal to ${error.min}.`;
        case 'max': return `Value must be less than or equal to ${error.max}.`;
        case 'email': return `Invalid email address.`;
        default: return error;
    }
}
