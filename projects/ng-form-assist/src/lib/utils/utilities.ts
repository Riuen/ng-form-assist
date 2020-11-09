import { SmartFieldConfig } from './smart-field-config';

export function initSmartFieldConfig(smartFieldConfig: SmartFieldConfig) {
    smartFieldConfig.enableClassChange = smartFieldConfig.enableClassChange || true;
    smartFieldConfig.enableErrorMessages = smartFieldConfig.enableErrorMessages || true;
    smartFieldConfig.enableTrim = smartFieldConfig.enableTrim || true;
    smartFieldConfig.errorStyleClass = smartFieldConfig.errorStyleClass || '';
    smartFieldConfig.errorMessageStyleClass = smartFieldConfig.errorMessageStyleClass || '';
    smartFieldConfig.convertEmptyStringToNull = smartFieldConfig.convertEmptyStringToNull || true;

    return smartFieldConfig;
}

/* Trims leading and trailing spaces, sets empty string to null */
export function trimValue(input: any) {

    if (!isString(input)) {
      return input;
    }

    if (input) {

      input = (input.length > 0)
        ? input.trim()
        : null;

      return input;
    }
  }

function isString(value: any): boolean {
    return ((typeof value) === 'string');
}
