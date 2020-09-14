import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FieldErrorViewComponent } from './field-error-view/field-error-view.component';
import { NgFormAssistComponent } from './ng-form-assist.component';
import { SmartFieldDirective } from './smart-field/smart-field.directive';


@NgModule({
  declarations: [
    NgFormAssistComponent,
    FieldErrorViewComponent,
    SmartFieldDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [NgFormAssistComponent, SmartFieldDirective]
})
export class NgFormAssistModule { }
