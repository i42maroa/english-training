import { Injectable, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarErrorComponent } from "../../components/snackbar/snackbar-error/snackbar-error.component";
import { SnackbarOkComponent } from "../../components/snackbar/snackbar-ok/snackbar-ok.component";

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor( private readonly snackBar: MatSnackBar, private readonly zone:NgZone) {}

    showSuccess(message:string): void {
        this.snackBar.openFromComponent(SnackbarOkComponent, {
            duration:3000,
            data: { message }
        });
    }

    showSuccessNoTime(message:string): void {
        this.snackBar.openFromComponent(SnackbarOkComponent, {
          data: { message }
        });
    }

    showError(message:string): void {
        this.zone.run(() => {
            this.snackBar.openFromComponent(SnackbarErrorComponent, {
                duration:3000,
                data: { message }
            });
        })
    }

    showErrorNoTime(message:string): void {
        this.zone.run(() => {
            this.snackBar.openFromComponent(SnackbarErrorComponent, {
              data: { message }
            });
        })
    }
}
