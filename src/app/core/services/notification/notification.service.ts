import { Injectable, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotificationSnackbarComponent } from "../../components/notification-snackbar/notification-snackbar.component";

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor( private readonly snackBar: MatSnackBar, private readonly zone:NgZone) {}

    showSuccess(title:string, message:string): void {
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
            duration:3000,
            data: {
                title,
                message,
                snackType: 'success'
            }
        });
    }

    showSuccessNoTime(title:string, message:string): void {
        this.snackBar.openFromComponent(NotificationSnackbarComponent, {
            data: {
                title,
                message,
                snackType: 'success',
                closeSnackbar: () => {
                    this.snackBar.dismiss();
                }
            }
        });
    }

    showError(title:string, message:string): void {
        this.zone.run(() => {
            this.snackBar.openFromComponent(NotificationSnackbarComponent, {
                duration:3000,
                data: {
                    title,
                    message,
                    snackType: 'error'
                }
            });
        })   
    }

    showErrorNoTime(title:string, message:string): void {
        this.zone.run(() => {
            this.snackBar.openFromComponent(NotificationSnackbarComponent, {
                data: {
                    title,
                    message,
                    snackType: 'error',
                    closeSnackbar: () => {
                        this.snackBar.dismiss();
                    }
                }
            });
        })   
    }
}