import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormAssistValidators, NgFormAssistModule } from 'ng-form-assist';

@Component({
    template: `
    <br/>
    <form [formGroup]="form">
        <input type="text" formControlName="f1" smartFormField #f1 />
        <input type="text" formControlName="f2" smartFormField #f2 />
        <input type="text" formControlName="f3" smartFormField #f3 />
        <input type="text" formControlName="f4" smartFormField #f4 />
    </form>
    `
})
class TestDateComponent {

    @ViewChild('f1') f1: ElementRef<HTMLInputElement>;
    @ViewChild('f2') f2: ElementRef<HTMLInputElement>;
    @ViewChild('f3') f3: ElementRef<HTMLInputElement>;
    @ViewChild('f4') f4: ElementRef<HTMLInputElement>;

    form = new FormGroup({
        f1: new FormControl(null, FormAssistValidators.dateBefore('2009/06/29')),
        f2: new FormControl(null, FormAssistValidators.dateBefore('2009/06/29', 'custom error message')),
        f3: new FormControl(null, FormAssistValidators.dateAfter('2009/06/29')),
        f4: new FormControl(null, FormAssistValidators.dateAfter('2009/06/29', 'custom error message'))
    });
}

describe('Date Before Validator', () => {
    let component: TestDateComponent;
    let fixture: ComponentFixture<TestDateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestDateComponent],
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
        fixture = TestBed.createComponent(TestDateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should add the error style class to the host field the input date exceeds the specified date.', () => {

        component.form.get('f1').setValue('2010/01/01');
        component.form.markAllAsTouched();
        fixture.detectChanges();
        const f1Class: string = component.f1.nativeElement.className;

        expect(f1Class).toContain('field-error-class');
    });

    it('the host field should not have the error style class when the input date is less the specified date.', () => {

        component.form.get('f1').setValue('2008/01/01');
        component.form.markAllAsTouched();
        fixture.detectChanges();
        const f1Class: string = component.f1.nativeElement.className;

        expect(f1Class).not.toContain('field-error-class');
    });

    it('should display the default validation message when the "dateBefore" validation rule is violated.', (done) => {

        component.form.get('f1').setValue('2010/01/01');
        component.form.markAllAsTouched();
        const defaultErrorMsg = 'Date entered must be less than June 29, 2009.';

        setTimeout(() => {
            fixture.detectChanges();
            const fieldErrorMsg: string = component.f1.nativeElement.nextElementSibling.textContent.trim();
            expect(fieldErrorMsg).toEqual(defaultErrorMsg);
            done();
        }, 350);
    });

    it('should display the user defined validation message when the "dateBefore" validation rule is violated.', (done) => {

        component.form.get('f2').setValue('2010/01/01');
        component.form.markAllAsTouched();
        const defaultErrorMsg = 'custom error message';

        setTimeout(() => {
            fixture.detectChanges();
            const fieldErrorMsg: string = component.f2.nativeElement.nextElementSibling.textContent.trim();
            expect(fieldErrorMsg).toEqual(defaultErrorMsg);
            done();
        }, 350);
    });
});


describe('Date After Validator', () => {
    let component: TestDateComponent;
    let fixture: ComponentFixture<TestDateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestDateComponent],
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
        fixture = TestBed.createComponent(TestDateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should add the error style class to the host field the input date is less than the specified date.', () => {

        component.form.get('f3').setValue('1970/01/01');
        component.form.markAllAsTouched();
        fixture.detectChanges();
        const f1Class: string = component.f3.nativeElement.className;

        expect(f1Class).toContain('field-error-class');
    });

    it('the host field should not have the error style class when the input date greater than the specified date.', () => {

        component.form.get('f3').setValue('2013/01/01');
        component.form.markAllAsTouched();
        fixture.detectChanges();
        const f1Class: string = component.f3.nativeElement.className;

        expect(f1Class).not.toContain('field-error-class');
    });

    it('should display the default validation message when the "dateAfter" validation rule is violated.', (done) => {

        component.form.get('f3').setValue('2008/01/01');
        component.form.markAllAsTouched();
        const defaultErrorMsg = 'Date entered must be greater than June 29, 2009.';

        setTimeout(() => {
            fixture.detectChanges();
            const fieldErrorMsg: string = component.f3.nativeElement.nextElementSibling.textContent.trim();
            expect(fieldErrorMsg).toEqual(defaultErrorMsg);
            done();
        }, 350);
    });

    it('should display the user defined validation message when the "dateBefore" validation rule is violated.', (done) => {

        component.form.get('f4').setValue('2007/01/01');
        component.form.markAllAsTouched();
        const defaultErrorMsg = 'custom error message';

        setTimeout(() => {
            fixture.detectChanges();
            const fieldErrorMsg: string = component.f4.nativeElement.nextElementSibling.textContent.trim();
            expect(fieldErrorMsg).toEqual(defaultErrorMsg);
            done();
        }, 350);
    });
});

