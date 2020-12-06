import { BehaviorSubject } from 'rxjs';

export const formFieldNameSubject: BehaviorSubject<string> = new BehaviorSubject(null);

/**
 * Forces a component to check for status changes.
 * @param fieldName Field that should check for state change
 */
export function triggerComponentUpdate(fieldName: string) {
    formFieldNameSubject.next(fieldName);
}

export function manualComponentUpdateEvent() {
    return formFieldNameSubject;
}
