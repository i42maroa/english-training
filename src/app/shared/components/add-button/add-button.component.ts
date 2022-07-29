import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { modalAddWord } from 'src/app/state/actions/words.actions';
import { selectShowAddButton } from 'src/app/state/selectors/words.selectors';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent implements OnInit {

  showButton$:Observable<boolean> = new Observable<boolean>();

  constructor(
    private readonly store:Store
  ) { }

  ngOnInit(): void {
    this.showButton$ = this.store.select(selectShowAddButton);
  }

  showAddModal(){
    this.store.dispatch(modalAddWord());
  }
}
