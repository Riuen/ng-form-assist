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
  selector: '[smartFormField]',
})
export class SmartFieldDirective implements OnInit, OnDestroy {

  @Input() public trim = true;

  private errorRepo = new Map();
  private componentRef: ComponentRef<FieldErrorViewComponent>;
  private eventSubscription: Subscription;

  @HostBinding('class.is-invalid')
  public get isInvalid() {
    return this.fieldControl.invalid && this.fieldControl.touched;
  }

  constructor(
    private fieldControl: NgControl,
    private target: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }


  ngOnInit(): void {

    this.createErrorComponent();
    this.eventSubscription = this.fieldControl.control.statusChanges
      .pipe(debounceTime(300))
      .subscribe(() => {

        this.componentRef.instance.errorMessage = this.getErrorMessage();
        this.fieldControl.control.markAsTouched();
      });
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }


  @HostListener('blur')
  public onBlur() {

    if (this.trim) {
      this.formatInput();
    }
  }


  // Utils
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

  /*
    Creates the component that displays the error message. The component will be
    inject directly below the host.
  */
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

      input = (input.length > 0)
        ? input.trim()
        : null;

      this.fieldControl.control.setValue(input);
    }
  }

  private isString(value: any): boolean {
    return ((typeof value) === 'string');
  }
}
