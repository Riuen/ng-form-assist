export function extractMessage(errorName: string, error: any): string {

    switch (errorName) {
        case 'required': return 'This field is required.';
        case 'minlength': return `Value entered must be greater than or equal to ${error.requiredLength} characters.`;
        case 'maxlength': return `Value entered must be less than or equal to ${error.requiredLength} characters.`;
        case 'pattern': return 'Invalid input.';
        case 'min': return `Value must be greater than or equal to ${error.min}.`;
        case 'max': return `Value must be less than or equal to ${error.max}.`;
        case 'email': return `Invalid email address.`;
        case 'username': return 'Username must begin with a letter and can only consist of lowercase letters, numbers, period, hypen or underscore.';
        case 'dateGreaterThanNow': return 'Date entered must be greater than the current date.';
        case 'dateLessThanNow': return 'Date entered must be less than the current date.';
        case 'passwordMatch': return 'Passwords do not match.';
        case 'passwordComplexity_Lowercase':
        case 'passwordComplexity_Uppercase':
        case 'passwordComplexity_Numeric':
        case 'passwordComplexity_Special': return 'Password must contain atleast 1 lowercase, uppercase, digit and special character.';
        default: return error;
    }
}
