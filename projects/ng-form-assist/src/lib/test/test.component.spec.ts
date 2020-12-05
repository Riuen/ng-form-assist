import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFormAssistModule } from 'ng-form-assist';
import { TestComponent } from './test.component';


describe('Default Behaviour', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestComponent ],
      imports: [
        ReactiveFormsModule,
        NgFormAssistModule.forRoot({
          invalidFieldClass: 'field-error-class',
          validationMessageClass: 'error-text-class',
        })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add error style class when validation rule violated', () => {

    component.invalidateField();
    fixture.detectChanges();
    const className = component.getF1Class();

    expect(className).toContain('field-error-class');
  });

  it('should not have error style class when no validation rules are violated', () => {

    component.form.patchValue({f1: 'ab'});
    fixture.detectChanges();
    const className = component.getF1Class();

    expect(className).not.toContain('field-error-class');
  });

  it('should trim string inputs', () => {

    const untrimmedValue = ' ab ';

    component.form.patchValue({f1: untrimmedValue});
    component.input.nativeElement.dispatchEvent(new Event('blur'));

    const fieldValue: string = component.getF1Value();

    expect(fieldValue.length).toBeLessThan(untrimmedValue.length);
  });

  it('should convert empty spaces or blank strings to null', () => {

    component.form.patchValue({f1: '  '});
    component.input.nativeElement.dispatchEvent(new Event('blur'));

    expect(component.form.get('f1').value).toBeNull();
  });

});
