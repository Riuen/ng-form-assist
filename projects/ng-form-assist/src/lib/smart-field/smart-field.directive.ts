import { ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, Directive, HostBinding, HostListener, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
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
  selector: '[smartField]'
})
export class SmartFieldDirective implements OnInit {

  private isInvalid: boolean;

  @HostBinding('class.is-invalid') get inValid() {
    return this.isInvalid && this.control.touched;
  }

  // private controlStatusChangeEventListener: Subscription;

  @Input()
  set errorDetails(value) {

   /*  if (value) {
      this.createErrorComponent();
    } */
  }

  private errorRepo = new Map();
  private componentRef: ComponentRef<FieldErrorViewComponent>;

  constructor(
    private control: NgControl,
    private cdr: ChangeDetectorRef,
    private target: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }


  ngOnInit(): void {
    this.createErrorComponent();
    this.isInvalid = this.control.invalid;
  }


  @HostListener('keydown') onValueChange() {
    this.formatInput();
    const msg = this.getErrorMessage();
    this.isInvalid = (msg && this.control.touched);
    this.componentRef.instance.errorMessage = msg;
    console.log(this.control.errors);
  }

  /* @HostListener('blur') onElementBlur() {
    this.componentRef.instance.errorMessage = this.getErrorMessage();
  } */

  private createErrorComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FieldErrorViewComponent);
    this.componentRef = this.target.createComponent(componentFactory);
    this.componentRef.instance.errorMessage = this.getErrorMessage();
    this.componentRef.instance.fieldControl = this.control;
  }

  private getErrorMessage() {

    let message = null;

    if (this.control.errors) {

      console.log(Object.keys(this.control.errors));
      const errorName = Object.keys(this.control.errors)[0];

      if (this.errorRepo.has(errorName)) {
        message = this.errorRepo.get(errorName);
        console.log('retrieving error emssage from cache');
      }
      else {
        console.log('building error message');
        message = extractMessage(errorName, this.control.errors[errorName]);
        this.errorRepo.set(errorName, message);
      }
    }

    return message;
  }


  // Utils
  private isString(value: any): boolean {
    return ((typeof value) === 'string');
  }

  /* Trims leading and trailing spaces, sets empty string to null */
  private formatInput() {

    let input = this.control.value;

    if (!this.isString(input)) {
      return;
    }

    if (input) {

      input = (input.length > 0)
        ? input.trim()
        : null;

      this.control.control.setValue(input);
      console.log('input: ('+input+')');
      console.log('is invalid: ' + (this.control.invalid && this.control.touched));
      // this.cdr.markForCheck();
    }
  }
}
