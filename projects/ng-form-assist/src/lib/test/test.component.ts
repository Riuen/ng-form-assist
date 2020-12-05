import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormAssistValidators } from 'ng-form-assist';

@Component({
  selector: 'lib-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {


  form: FormGroup;

  @ViewChild('f1') input: ElementRef<HTMLInputElement>;
  @ViewChild('requiredAngular') requiredAngular: ElementRef<HTMLInputElement>;
  @ViewChild('requiredCustom') requiredCustom: ElementRef<HTMLInputElement>;
  @ViewChild('requiredCustom_default') requiredCustom_default: ElementRef<HTMLInputElement>;
  @ViewChild('trimDisabledField') trimDisabledField: ElementRef<HTMLInputElement>;

  constructor() { }

  ngOnInit(): void {

    this.form = new FormGroup({
      f1: new FormControl(null, [FormAssistValidators.maxLength(2)]),
      requiredAngular: new FormControl(null, Validators.required),
      requiredCustom: new FormControl(null, FormAssistValidators.required('custom required message')),
      requiredCustom_default: new FormControl(null, FormAssistValidators.required(null)),
      trimDisabledField: new FormControl(null)
    });
  }

  public invalidateField() {
    this.form.get('f1').setValue('abc');
    this.form.get('f1').markAsTouched();
  }

  public getF1Value() {
    return this.form.get('f1').value;
  }

  public getF1Class() {
    return this.input.nativeElement.className;
  }

  public triggerBlur() {
    this.input.nativeElement.dispatchEvent(new Event('blur'));
  }
}
