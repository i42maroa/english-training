import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-ok',
  templateUrl: './snackbar-ok.component.html',
  styleUrls: ['./snackbar-ok.component.scss']
})
export class SnackbarOkComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data:any) { }

  ngOnInit(): void {
  }

}
