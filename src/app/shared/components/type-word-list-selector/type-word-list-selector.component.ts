import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { nextTypeWord, prevTypeWord } from 'src/app/state/actions/words.actions';
import { selectWordTypeSearchName,  } from 'src/app/state/selectors/words.selectors';

@Component({
  selector: 'app-type-word-list-selector',
  templateUrl: './type-word-list-selector.component.html',
  styleUrls: ['./type-word-list-selector.component.scss']
})
export class TypeWordListSelectorComponent implements OnInit {

  position:number = 0;
  text:string = '';
  wordType$: Observable<string> = new Observable<string>();

  /**
   * Creates an instance of TypeWordListSelectorComponent.
   * @param {Store} store
   * @memberof TypeWordListSelectorComponent
   */
  constructor(
    private readonly store:Store
  ) { }

  /**
   * ngOnInit
   *
   * @memberof TypeWordListSelectorComponent
   */
  ngOnInit(): void {
    this.wordType$ = this.store.select(selectWordTypeSearchName);
  }

  /**
   * Dispatch the previous wordType
   *
   * @memberof TypeWordListSelectorComponent
   */
  prevType(){
    this.store.dispatch(prevTypeWord());
  }

  /**
   * Dispatch the next wordType
   *
   * @memberof TypeWordListSelectorComponent
   */
  nextType(){
    this.store.dispatch(nextTypeWord());
  }
}
