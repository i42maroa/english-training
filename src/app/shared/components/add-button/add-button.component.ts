import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent implements OnInit, OnChanges {

  @Output() showModal = new EventEmitter<boolean>();
  @Input() show:boolean = true;

  buttonStatus:boolean = true;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['show']){
      this.buttonStatus = !changes['show'].currentValue;
    }
  }

  ngOnInit(): void {
  }


  showAddModal(status:boolean){
    this.buttonStatus = !status;
    this.showModal.emit(status);
  }
}
