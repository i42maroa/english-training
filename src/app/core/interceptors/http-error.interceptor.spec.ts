import { HttpErrorResponse } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core"
import { TestBed } from "@angular/core/testing"
import { throwError } from "rxjs";
import { HttpErrorInterceptor } from "./http-error.interceptor"

describe('HttpErrorInterceptor', ()=> {
    beforeEach(() => 
        TestBed.configureTestingModule({
            providers: [HttpErrorInterceptor],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
        })
    )
});

it('should be created', () => {
    const interceptor: HttpErrorInterceptor = TestBed.inject(HttpErrorInterceptor);
    expect(interceptor).toBeTruthy();
});

it('should intercept client errors', () => {
    const errorEvent: ErrorEvent = new ErrorEvent('error');
    const error: HttpErrorResponse = new HttpErrorResponse({
        error:errorEvent,
        status:404,
        statusText: 'Not Found'
    });
    const errorInterceptor = new HttpErrorInterceptor();
    const httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['']);
    const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    httpHandlerSpy.handle.and.returnValue(throwError(error));
    errorInterceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe(
        result => console.log('ok', result),
        err => expect(err).toContain('Error:')
    )
})

it('should intercept server errors', () => {
    const error: HttpErrorResponse = new HttpErrorResponse({
        error:'404 error',
        status:404,
        statusText: 'Not Found'
    });
    const errorInterceptor = new HttpErrorInterceptor();
    const httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['']);
    const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    httpHandlerSpy.handle.and.returnValue(throwError(error));
    errorInterceptor.intercept(httpRequestSpy, httpHandlerSpy).subscribe(
        result => console.log('ok', result),
        err => expect(err).toContain('Error Status: 404')
    )
})