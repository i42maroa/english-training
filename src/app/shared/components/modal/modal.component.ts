import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeModal } from 'src/app/state/actions/words.actions';
import { selectModalWord } from 'src/app/state/selectors/words.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  modalTitle:string = "";
  isMod:boolean = false;

  modalType$:Observable<any> = new Observable<any>();

  constructor(
    private readonly store:Store
  ) {
    this.modalType$ = this.store.select(selectModalWord);
  }

  ngOnInit(): void {

  }

  closeModal(){
    this.store.dispatch(closeModal());
  }

}
