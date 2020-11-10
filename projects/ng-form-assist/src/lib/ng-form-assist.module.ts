import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FieldErrorViewComponent } from './field-error-view/field-error-view.component';
import { SmartFieldDirective } from './smart-field/smart-field.directive';
import { SmartFieldConfig } from './utils/smart-field-config';
import { initSmartFieldConfig } from './utils/utilities';


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
export class NgFormAssistModule {
  static forRoot(
    libConfiguration: SmartFieldConfig
  ): ModuleWithProviders<NgFormAssistModule> {
    libConfiguration = initSmartFieldConfig(libConfiguration); // Set defaults if missing.
    return {
      ngModule: NgFormAssistModule,
      providers: [
        {
          provide: SmartFieldConfig,
          useValue: libConfiguration,
        },
      ],
    };
  }
}
