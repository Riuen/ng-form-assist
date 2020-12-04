import { SmartFieldConfig } from './smart-field-config';

export function initSmartFieldConfig(config: SmartFieldConfig) {

    config.displayValidationMessages = config.displayValidationMessages ?? true;
    config.applyTrim = config.applyTrim ?? true;
    config.validationMessageClass = config.validationMessageClass || '';
    config.setBlankToNull = config.setBlankToNull ?? true;

    return config;
}
