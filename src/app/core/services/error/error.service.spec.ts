import { HttpErrorResponse } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas:[NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a cliente error message from getClientErrorMessage', () => {
    const error:Error = new Error('error');
    const res = service.getClientErrorMessage(error);
    expect(res).toBe(error.message);
  });

  it('should return a cliente error string from getClientErrorMessage', () => {
    const error:Error = new Error(undefined);
    const res = service.getClientErrorMessage(error);
    expect(res).toBe('Error');
  });

  it('should return a server error message from getServerErrorMessage', () => {
    const error:HttpErrorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404,
      statusText: 'Not Found'
    });
    const res = service.getServerErrorMessage(error);
    expect(res).toBe(error.message);
  });

  it('should return a internet connection error from getServerErrorMessage', () => {
    const error:HttpErrorResponse = new HttpErrorResponse({
      error: '404 error',
      status: 404,
      statusText: 'Not Found'
    });
    spyOnProperty(Navigator.prototype, 'onLine').and.returnValue(false);
    const res = service.getServerErrorMessage(error);
    expect(res).toBe('No Internet Connection');
  });
});
