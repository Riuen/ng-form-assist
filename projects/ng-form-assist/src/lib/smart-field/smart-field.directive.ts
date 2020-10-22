import { ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, Directive, HostBinding, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FieldErrorViewComponent } from '../field-error-view/field-error-view.component';
import { extractMessage } from '../utils/error-message-formatter';
import { debounceTime, distinctUntilChanged, filter, find, map, skipUntil, tap } from 'rxjs/operators';

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

  // private ;

    @HostBinding('class.is-invalid') get inValid() {
      return this.fieldControl.invalid && this.fieldControl.touched;
    }

  // @HostBinding('class.is-invalid') isInvalid: boolean;
  @Input()
  set errorDetails(value) {

    /*  if (value) {
       this.createErrorComponent();
     } */
  }

  private errorRepo = new Map();
  private componentRef: ComponentRef<FieldErrorViewComponent>;

  constructor(
    private fieldControl: NgControl,
    private target: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver) {
  }


  ngOnInit(): void {
    this.createErrorComponent();
    // this.isInvalid = false;

    // let previous = null;
    // let errorMessage = null;
    /*  this.fieldControl.valueChanges.subscribe(value => {
 
       if (value !== previous) {
         console.log(`input changed from |${previous}| to |${value}|`);
         // this.formatInput();
         errorMessage = this.getErrorMessage();
         this.componentRef.instance.errorMessage = errorMessage;
         this.isInvalid = (errorMessage !== null);
         // this.fieldControl.control.updateValueAndValidity();
         // this.cdr.detectChanges();
         previous = value;
       }
     }); */

    /* this.fieldControl.control.valueChanges
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        const errorMessage = this.getErrorMessage();
        console.log('error: ' + errorMessage);
        this.componentRef.instance.errorMessage = errorMessage;
        // this.isInvalid = (errorMessage !== null);
      }); */

    this.fieldControl.control.statusChanges
      // .pipe(filter(status => status === 'VALID'))
      .pipe(debounceTime(500))
      // .pipe(distinctUntilChanged())
      .subscribe((e) => {
        console.log(this.fieldControl.name);
        console.log('status updated to ' + e);

        if (e === 'VALID') {
          this.componentRef.instance.errorMessage = null;
        }
        else {
          this.fieldControl.control.markAsTouched();
          this.componentRef.instance.errorMessage = this.getErrorMessage();
        }
        // this.isInvalid = false;
      });
  }



  /*     ngOnChanges(changes: SimpleChanges){
        if(changes.input){
          console.log('input changed');
          console.log('keypress')
          console.log(this.fieldControl.control.errors);
          console.log(this.fieldControl.errors);
          const errorMessage = this.getErrorMessage();
          this.componentRef.instance.errorMessage = errorMessage;
          this.isInvalid = (errorMessage !== null);
        }
      } */



  /* @HostListener('keypress') onValueChange() {
    console.log('input changed');
    console.log('change')
    console.log(this.fieldControl.control.errors);
    console.log(this.fieldControl.errors);
  } */

  private getErrorMessage() {

    let message = null;
    const fieldErrors = this.fieldControl.errors || this.fieldControl.control.errors;

    console.log('control errors');
    console.log(fieldErrors);
    console.log(this.fieldControl.control.errors);
    console.log('------');

    if (fieldErrors) {

      console.log(Object.keys(fieldErrors));
      const errorName = Object.keys(fieldErrors)[0];

      if (this.errorRepo.has(errorName)) {
        message = this.errorRepo.get(errorName);
        console.log('retrieving error emssage from cache: ' + errorName);
        console.log('message retrieved: ' + message);
      }
      else {
        console.log('building error message for error: ' + errorName);
        message = extractMessage(errorName, this.fieldControl.errors[errorName]);
        console.log('message built: ' + message);
        this.errorRepo.set(errorName, message);
      }
    }

    return message;
  }


  // Utils
  private isString(value: any): boolean {
    return ((typeof value) === 'string');
  }

  private createErrorComponent() {
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
}
