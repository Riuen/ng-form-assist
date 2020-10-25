import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FieldErrorViewComponent } from './field-error-view/field-error-view.component';
import { SmartFieldDirective } from './smart-field/smart-field.directive';


@NgModule({
  declarations: [
    FieldErrorViewComponent,
    SmartFieldDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [SmartFieldDirective]
})
export class NgFormAssistModule { }
