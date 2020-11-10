import { SmartFieldConfig } from './smart-field-config';

export function initSmartFieldConfig(config: SmartFieldConfig) {

    config.displayValidationMessages = (config.displayValidationMessages == null)
        ? true
        : config.displayValidationMessages;
    config.applyTrim = config.applyTrim || true;
    config.validationMessageClass = config.validationMessageClass || '';
    config.setBlankToNull = config.setBlankToNull || true;

    return config;
}

/* Trims leading and trailing spaces, sets empty string to null */
export function formatInput(input: any, setBlankToNull: boolean) {

    if (!isString(input)) {
      return input;
    }

    if (input) {

      input = (input.length > 0)
        ? input.trim()
        : (setBlankToNull) ? null : input;

      return input;
    }
  }

function isString(value: any): boolean {
    return ((typeof value) === 'string');
}
