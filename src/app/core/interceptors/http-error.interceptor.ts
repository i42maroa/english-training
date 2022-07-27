import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, retry, throwError } from "rxjs";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>{
        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                if (error.error instanceof ErrorEvent){
                    //client-side error
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    //server-side error
                    errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`
                }
                return throwError(errorMessage);
            })
        );  
    }
}