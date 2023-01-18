import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_SNACK_BAR_DATA as MAT_SNACK_BAR_DATA } from '@angular/material/legacy-snack-bar';

@Component({
  selector: 'app-notification-snackbar',
  templateUrl: './notification-snackbar.component.html',
  styleUrls: ['./notification-snackbar.component.scss']
})
export class NotificationSnackbarComponent  {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data:any) { }

  get getIcon(): string {
    let matIcon:string;
    switch(this.data.snackType){
      case 'success':
        matIcon = 'check_circle_outline';
        break;
      case 'error':
        matIcon = 'warning_outline';
        break;
      default:
        matIcon = '';
        break;
    }
    return matIcon;
  }

  closeSnackbar(): void {
    this.data.closeSnackbar();
  }

}
