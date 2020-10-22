import { ComponentFactoryResolver, ComponentRef, Directive, HostBinding, HostListener, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FieldErrorViewComponent } from '../field-error-view/field-error-view.component';
import { extractMessage } from '../utils/error-message-formatter';

/**
 * This directive was created as a utility to handle the following:
 * 1) Dynamically add / remove the error css class of the host to reflect when the host has an error.
 * 2) If the data type of the host is a 'string', then the value will be modified as follows:
 *    - Non empty strings will be trimmed.
 *    - Empty strings will be converted to null.
 * 3) If an error details object is provided then the FormFieldErrors component will be rendered in
 *      order to handle displaying the the appropriate error messages.
 */

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[smartField]',
})
export class SmartFieldDirective implements OnInit, OnDestroy {

  @HostBinding('class.is-invalid') isInvalid: boolean;

  @Input() public trim = true;

  private errorRepo = new Map();
  private componentRef: ComponentRef<FieldErrorViewComponent>;
  private eventSubscription: Subscription;

  constructor(
    private fieldControl: NgControl,
    private target: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }


  ngOnInit(): void {

    let errorMessage = null;
    this.createErrorComponent();
    this.eventSubscription = this.fieldControl.control.statusChanges
      .pipe(debounceTime(300))
      .subscribe(() => {

        errorMessage = this.getErrorMessage();
        this.componentRef.instance.errorMessage = errorMessage;
        this.fieldControl.control.markAsTouched();
        this.isInvalid = (errorMessage !== null);
      });
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  private getErrorMessage(): string {

    let message = null;

    if (this.fieldControl.errors) {

      const errorName = Object.keys(this.fieldControl.errors)[0];

      if (this.errorRepo.has(errorName)) {
        message = this.errorRepo.get(errorName);
      }
      else {
        message = extractMessage(errorName, this.fieldControl.errors[errorName]);
        this.errorRepo.set(errorName, message);
      }
    }

    return message;
  }

  @HostListener('blur') onBlur() {

    if (this.trim) {
      console.log('status change');
      this.formatInput();
    }
  }


  // Utils
  private isString(value: any): boolean {
    return ((typeof value) === 'string');
  }

  private createErrorComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FieldErrorViewComponent);
    this.componentRef = this.target.createComponent(componentFactory);
    this.componentRef.instance.errorMessage = this.getErrorMessage();
    this.componentRef.instance.fieldControl = this.fieldControl;
  }

  /* Trims leading and trailing spaces, sets empty string to null */
  private formatInput() {

    let input = this.fieldControl.value;

    if (!this.isString(input)) {
      return;
    }

    if (input) {

      console.log('formatting string');
      input = (input.length > 0)
        ? input.trim()
        : null;

      this.fieldControl.control.setValue(input);
    }
  }
}
