import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { nextTypeWord, prevTypeWord } from 'src/app/state/actions/words.actions';
import { selectWordTypeSearch } from 'src/app/state/selectors/words.selectors';
import { WordType, WordTypeSearch, WORD_TYPE } from '../../models/word.interface';

@Component({
  selector: 'app-type-word-list-selector',
  templateUrl: './type-word-list-selector.component.html',
  styleUrls: ['./type-word-list-selector.component.scss']
})
export class TypeWordListSelectorComponent implements OnInit {

  position:number = 0;
  text:string = '';
  wordType$: Observable<WordTypeSearch> = new Observable<WordTypeSearch>();

  constructor(
    private readonly store:Store
  ) { }

  ngOnInit(): void {
    this.wordType$ = this.store.select(selectWordTypeSearch);
  }

  prevType(){
    this.store.dispatch(prevTypeWord());
  }

  nextType(){
    this.store.dispatch(nextTypeWord());
  }
}
