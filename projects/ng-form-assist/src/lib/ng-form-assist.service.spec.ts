import { TestBed } from '@angular/core/testing';

import { NgFormAssistService } from './ng-form-assist.service';

describe('NgFormAssistService', () => {
  let service: NgFormAssistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgFormAssistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
