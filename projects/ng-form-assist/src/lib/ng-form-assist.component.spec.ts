import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgFormAssistComponent } from './ng-form-assist.component';

describe('NgFormAssistComponent', () => {
  let component: NgFormAssistComponent;
  let fixture: ComponentFixture<NgFormAssistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgFormAssistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgFormAssistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
