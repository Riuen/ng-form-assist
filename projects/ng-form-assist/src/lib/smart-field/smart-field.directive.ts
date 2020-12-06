import {
  ComponentFactoryResolver, ComponentRef, Directive, ElementRef,
  HostBinding, HostListener, Input, OnDestroy, OnInit, ViewContainerRef
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { FieldErrorViewComponent } from '../field-error-view/field-error-view.component';
import { extractMessage } from '../utils/error-message-formatter';
import { SmartFieldConfig } from '../utils/smart-field-config';
import { manualComponentUpdateEvent } from '../utils/utilities';

/**
 * This directive was created as a utility to handle the following:
 * 1) Dynamically add / remove the error css class of the host to reflect when the host has an error.
 * 2) If the data type of the host is a 'string', then the value will be modified as follows:
 *    - Non empty strings will be trimmed.
 *    - Empty strings will be converted to null.
 * 3) Inject a component below the host that will display validation messages when they occur.
 */

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[smartFormField]',
})
export class SmartFieldDirective implements OnInit, OnDestroy {

  @Input() set applyTrim(trim: string) {
    this.trim = (trim === 'true');
  }

  private trim: boolean;
  private errorRepo = new Map();
  private componentRef: ComponentRef<FieldErrorViewComponent>;
  private valueChangeEventSubscription: Subscription;
  private manualUpdateEventSubscription: Subscription;
  private defaultFieldStyleClass: string;
  private hostElementType: string;

  @HostBinding('class')
  public get elementClass() {
    if (this.fieldControl.invalid && this.fieldControl.touched && this.config.invalidFieldClass) {
      return `${this.defaultFieldStyleClass} ${this.config.invalidFieldClass}`;
    }
    else {
      return this.defaultFieldStyleClass;
    }
  }

  constructor(
    private fieldControl: NgControl,
    private target: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private hostElement: ElementRef,
    private readonly config: SmartFieldConfig) {
    this.defaultFieldStyleClass = this.hostElement.nativeElement.getAttribute('class') || '';
    this.hostElementType = this.hostElement.nativeElement.getAttribute('type');
    this.trim = config.applyTrim;
  }


  ngOnInit(): void {

    if (this.config.displayValidationMessages) {
      this.createErrorComponent();

      this.manualUpdateEventSubscription = manualComponentUpdateEvent()
        .pipe(filter(field => field === this.fieldControl.name))
        .subscribe(() => {

          this.componentRef.instance.errorMessage = this.getErrorMessage();
          this.fieldControl.control.markAsTouched();
        });

      this.valueChangeEventSubscription = this.fieldControl.control.valueChanges
        .pipe(debounceTime(300))
        .subscribe(() => {

          this.componentRef.instance.errorMessage = this.getErrorMessage();
          this.fieldControl.control.markAsTouched();
        });
    }
  }

  ngOnDestroy(): void {
    if (this.valueChangeEventSubscription) {
      this.valueChangeEventSubscription.unsubscribe();
    }
    if (this.manualUpdateEventSubscription) {
      this.manualUpdateEventSubscription.unsubscribe();
    }
  }


  @HostListener('blur')
  public onBlur(): void {

    const input = this.fieldControl.value;
    let formattedInput = this.fieldControl.value;

    if (this.hostElementType === 'text') {

      if (this.trim) {
        formattedInput = input?.trim();
      }

      if (this.config.setBlankToNull) {
        formattedInput = formattedInput?.length === 0 ? null : formattedInput;
      }

      if (input?.length !== formattedInput?.length) {
        this.fieldControl.control.setValue(formattedInput);
      }
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
    this.componentRef.instance.fieldClass = this.config.validationMessageClass;
  }
}
