import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { NotificationService } from '../notification/notification.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private readonly injector: Injector) { }

  handleError(error: Error | HttpErrorResponse): void {
    const errorService = this.injector.get(ErrorService);
    const notificationService = this.injector.get(NotificationService);
    let message: string;

    if(error instanceof HttpErrorResponse) {
      // Server error
      message = errorService.getServerErrorMessage(error);
    }else{
      //Cliente Error
      message = errorService.getClientErrorMessage(error);
    }
    notificationService.showError('', message);
    console.log(error);
  }
}
