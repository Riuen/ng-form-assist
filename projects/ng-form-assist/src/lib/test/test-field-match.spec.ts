import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormAssistValidators, NgFormAssistModule } from 'ng-form-assist';

@Component({
    template: `
    <br/>
    <form [formGroup]="form">
        <input type="text" formControlName="p1" smartFormField #p1 />
        <input type="text" formControlName="p2" smartFormField #p2 />
    </form>
    `
})
class TestFieldMatchComponent {

    @ViewChild('p1') p1: ElementRef<HTMLInputElement>;
    @ViewChild('p2') p2: ElementRef<HTMLInputElement>;

    form = new FormGroup({
        p1: new FormControl(null),
        p2: new FormControl(null),
    });

    constructor() {
        this.form.setValidators(FormAssistValidators.fieldMatch('p1', 'p2'));
    }
}

describe('Field Match Validator', () => {
    let component: TestFieldMatchComponent;
    let fixture: ComponentFixture<TestFieldMatchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestFieldMatchComponent],
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
        fixture = TestBed.createComponent(TestFieldMatchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should add the error style class to both specified fields when the values do not match.', () => {

        component.form.get('p1').setValue('password');
        component.form.get('p2').setValue('passwor');
        component.form.markAllAsTouched();
        component.p1.nativeElement.dispatchEvent(new Event('blur'));
        component.p2.nativeElement.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        const f1Class: string = component.p1.nativeElement.className;
        const f2Class: string = component.p2.nativeElement.className;

        expect(f1Class.includes('field-error-class') && f2Class.includes('field-error-class')).toBeTrue();
    });

    it('should display the default validation message when the specified fields do not match.', () => {

        component.form.get('p1').setValue('password');
        component.form.get('p2').setValue('passwor');
        component.form.markAllAsTouched();
        fixture.detectChanges();
        const f1Error: string = component.p1.nativeElement.nextElementSibling.textContent.trim();
        const f2Error: string = component.p2.nativeElement.nextElementSibling.textContent.trim();
        const defaultErrorMsg = 'Value for p1 does not match p2.';

        expect(f1Error === defaultErrorMsg && f2Error === defaultErrorMsg).toBeTrue();
    });

    it('should remove the validation message when the specified fields match.', () => {

        component.form.get('p1').setValue('password');
        component.form.get('p2').setValue('password');
        component.form.markAllAsTouched();
        fixture.detectChanges();
        const f1Error: string = component.p1.nativeElement.nextElementSibling.textContent.trim();
        const f2Error: string = component.p2.nativeElement.nextElementSibling.textContent.trim();

        expect(f1Error === '' && f2Error === '').toBeTrue();
    });

    it('host field should not have the error style class applied when the specified fields match.', () => {

        component.form.get('p1').setValue('password');
        component.form.get('p2').setValue('password');
        component.form.markAllAsTouched();
        fixture.detectChanges();
        const f1Class: string = component.p1.nativeElement.className;
        const f2Class: string = component.p2.nativeElement.className;

        expect(f1Class.includes('field-error-class') && f2Class.includes('field-error-class')).toBeFalse();
    });
});
