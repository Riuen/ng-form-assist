import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFormAssistModule } from 'ng-form-assist';

@Component({
    template: `
    <br/>
    <form [formGroup]="form">
        <input type="text" formControlName="f1" smartFormField #f1 />
        <input type="text" formControlName="f2" smartFormField #f2 applyTrim="true"/>
    </form>
    `
})
class TestHostComponent {
    @ViewChild('f1') f1: ElementRef<HTMLInputElement>;
    @ViewChild('f2') f2: ElementRef<HTMLInputElement>;
    form = new FormGroup({
        f1: new FormControl(null, Validators.required),
        f2: new FormControl(null),
    });
}

describe('Configuration / Customization (String trimming)', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestHostComponent],
            imports: [
                ReactiveFormsModule,
                NgFormAssistModule.forRoot({
                    invalidFieldClass: 'field-error-class',
                    validationMessageClass: 'error-text-class',
                    applyTrim: false
                })
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should not trim input when global applyTrim is set to false.', () => {

        const untrimmedValue = ' ab ';

        component.form.patchValue({f1: untrimmedValue});
        component.f1.nativeElement.dispatchEvent(new Event('blur'));

        const fieldValue: string = component.form.get('f1').value;

        expect(fieldValue.length).toEqual(untrimmedValue.length);
    });

    it('should be able to override global trim settings for any component', () => {

        const untrimmedValue = ' ab ';

        component.form.patchValue({f2: untrimmedValue});
        component.f2.nativeElement.dispatchEvent(new Event('blur'));

        const fieldValue: string = component.form.get('f2').value;

        expect(fieldValue.length).toBeLessThan(untrimmedValue.length);
    });

});

describe('Configuration / Customization (Set empty space / blank string to NULL)', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestHostComponent],
            imports: [
                ReactiveFormsModule,
                NgFormAssistModule.forRoot({
                    invalidFieldClass: 'field-error-class',
                    validationMessageClass: 'error-text-class',
                    setBlankToNull: false
                })
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should not set blank spaces / empty string to NULL when global setBlankToNull is set to false.', () => {

        component.form.patchValue({f1: ' '});
        component.f1.nativeElement.dispatchEvent(new Event('blur'));

        expect(component.form.get('f1').value).not.toBeNull();
    });
});

describe('Configuration / Customization', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestHostComponent],
            imports: [
                ReactiveFormsModule,
                NgFormAssistModule.forRoot({
                    displayValidationMessages: false
                })
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should not add additional style class to host field on validation rule violation when no style class set.', () => {

        component.form.get('f1').reset();
        fixture.detectChanges();
        const fieldState1 = component.f1.nativeElement.className.split(' ');

        component.form.get('f1').markAsTouched();
        fixture.detectChanges();
        const fieldState2 = component.f1.nativeElement.className.split(' ');

        expect(fieldState1.length).toEqual(fieldState2.length);
    });

    it('should not display a validation message when displayValidationMessage is set to false', () => {

        component.form.patchValue({f1: null});
        component.form.get('f1').markAsTouched();
        fixture.detectChanges();

        const fieldErrorMsg = component.f1.nativeElement.nextElementSibling.textContent.trim();

        expect(fieldErrorMsg.length).toEqual(0);
      });
});

