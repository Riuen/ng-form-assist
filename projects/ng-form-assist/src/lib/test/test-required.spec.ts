import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFormAssistModule } from 'ng-form-assist';
import { TestComponent } from './test.component';


describe('Required Field Validator (Angular Validator)', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [
                ReactiveFormsModule,
                NgFormAssistModule.forRoot({
                    invalidFieldClass: 'field-error-class',
                    validationMessageClass: 'error-text-class',
                })
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should add error css class to field when the required validation rule is violated (Angular Validator).', () => {

        component.form.get('requiredAngular').setValue(null);
        component.form.get('requiredAngular').markAsTouched();
        fixture.detectChanges();

        expect(component.requiredAngular.nativeElement.className).toContain('field-error-class');
    });

    it('should add default error message when the Angular required field validator is used.', () => {

        component.form.get('requiredAngular').setValue(null);
        component.form.get('requiredAngular').markAsTouched();
        fixture.detectChanges();

        const fieldErrorMsg = component.requiredAngular.nativeElement.nextElementSibling.textContent.trim();

        expect(fieldErrorMsg).toEqual('This field is required.');
    });

});

describe('Required Field Validator (Form Assist Validator)', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [
                ReactiveFormsModule,
                NgFormAssistModule.forRoot({
                    invalidFieldClass: 'field-error-class',
                    validationMessageClass: 'error-text-class',
                })
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('should add error css class to field when required validation rule is violated.', () => {

        component.form.get('requiredCustom').setValue(null);
        component.form.get('requiredCustom').markAsTouched();
        fixture.detectChanges();

        expect(component.requiredCustom.nativeElement.className).toContain('field-error-class');
    });


    it('should add user defined error message when required validation rule is violated.', () => {

        component.form.get('requiredCustom').setValue(null);
        component.form.get('requiredCustom').markAsTouched();
        fixture.detectChanges();

        const fieldErrorMsg = component.requiredCustom.nativeElement.nextElementSibling.textContent.trim();

        expect(fieldErrorMsg).toEqual('custom required message');
    });

    it('should add default error message when the no user defined error message is set (FormAssist).', () => {

        component.form.get('requiredCustom_default').setValue(null);
        component.form.get('requiredCustom_default').markAsTouched();
        fixture.detectChanges();

        const fieldErrorMsg = component.requiredCustom_default.nativeElement.nextElementSibling.textContent.trim();

        expect(fieldErrorMsg).toEqual('This field is required.');
    });

});
