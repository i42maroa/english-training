import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { closeEditButtons, deleteWord, loadWords, modalModifyWord, showEditButtons } from 'src/app/state/actions/words.actions';
import { selectWords, selectShowEditButtons, selectWordTypeSearch } from 'src/app/state/selectors/words.selectors';
import { Word, WordTypeSearch } from '../../models/word.interface';

@Component({
  selector: 'app-list-words',
  templateUrl: './list-words.component.html',
  styleUrls: ['./list-words.component.scss']
})
export class ListWordsComponent implements OnInit {

  wordsList:Word[] = [];
  wordList$:Observable<any> = new Observable();
  wordType$:Observable<number> = new Observable<number>();
  showEditButtons$:Observable<boolean> = new Observable<boolean>();

  constructor(
    private readonly store:Store
  ) { }

  ngOnInit(): void {
    this.wordList$ = this.store.select(selectWords);
    this.showEditButtons$ = this.store.select(selectShowEditButtons);
    this.wordType$ = this.store.select(selectWordTypeSearch);
    this.store.dispatch(loadWords())
  }

  updateWord(word:Word){
    this.store.dispatch(modalModifyWord({word}));
  }

  deleteWord(word:Word){
    this.store.dispatch(deleteWord({word}))
  }

  // showDeleteModal(){
  //   this.isDeleteModalShow = true;
  // }

  showEditButtons(){
    this.store.dispatch(showEditButtons());
  }

  closeEditButtons(){
    this.store.dispatch(closeEditButtons());
  }
}
