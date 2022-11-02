import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { nextTypeWord, prevTypeWord } from 'src/app/state/actions/words.actions';
import { selectWordTypeSearch, selectWordTypeSearchName,  } from 'src/app/state/selectors/words.selectors';

@Component({
  selector: 'app-type-word-list-selector',
  templateUrl: './type-word-list-selector.component.html',
  styleUrls: ['./type-word-list-selector.component.scss']
})
export class TypeWordListSelectorComponent implements OnInit {

  position:number = 0;
  text:string = '';
  wordType$: Observable<string> = new Observable<string>();

  constructor(
    private readonly store:Store
  ) { }

  ngOnInit(): void {
    this.wordType$ = this.store.select(selectWordTypeSearchName);
  }

  prevType(){
    this.store.dispatch(prevTypeWord());
  }

  nextType(){
    this.store.dispatch(nextTypeWord());
  }
}
