import { Injectable, NgZone } from "@angular/core";
import { MatLegacySnackBar as MatSnackBar } from "@angular/material/legacy-snack-bar";
import { SnackbarErrorComponent } from "../../components/snackbar/snackbar-error/snackbar-error.component";
import { SnackbarOkComponent } from "../../components/snackbar/snackbar-ok/snackbar-ok.component";

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor( private readonly snackBar: MatSnackBar, private readonly zone:NgZone) {}

    showSuccess(word:string, message:string, ): void {
        this.snackBar.openFromComponent(SnackbarOkComponent, {
            duration:3000,
            data: { message, word }
        });
    }

    showSuccessNoTime(word:string, message:string): void {
        this.snackBar.openFromComponent(SnackbarOkComponent, {
          data: { message, word }
        });
    }

    showError(word:string, message:string): void {
        this.zone.run(() => {
            this.snackBar.openFromComponent(SnackbarErrorComponent, {
                duration:3000,
                data: { message, word }
            });
        })
    }

    showErrorNoTime(word:string, message:string): void {
        this.zone.run(() => {
            this.snackBar.openFromComponent(SnackbarErrorComponent, {
              data: { message, word }
            });
        })
    }
}
