import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFormAssistModule } from 'ng-form-assist';
import { TestComponent } from './test.component';


@NgModule({
  declarations: [
    // TestComponent
  ],
  imports: [
    /* ReactiveFormsModule,
    NgFormAssistModule.forRoot({
      invalidFieldClass: 'field-error-class',
      validationMessageClass: 'error-text-class'
    }) */
  ]
})
export class TestModule { }
