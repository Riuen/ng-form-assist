import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrorViewComponent } from './field-error-view.component';

describe('FieldErrorViewComponent', () => {
  let component: FieldErrorViewComponent;
  let fixture: ComponentFixture<FieldErrorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldErrorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldErrorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
