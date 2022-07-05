import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent implements OnInit {

  @Output() showModal = new EventEmitter<boolean>();

  buttonStatus:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  showAddModal(status:boolean){
    this.buttonStatus = !status;
    this.showModal.emit(status);
  }
}
