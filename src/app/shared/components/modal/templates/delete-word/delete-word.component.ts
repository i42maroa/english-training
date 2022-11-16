import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Word } from 'src/app/shared/models/word.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { selectWordModalWord } from 'src/app/state/selectors/words.selectors';
import { closeModal, deleteWord } from 'src/app/state/actions/words.actions';

@Component({
  selector: 'app-delete-word',
  templateUrl: './delete-word.component.html',
  styleUrls: ['./delete-word.component.scss']
})
export class DeleteWordComponent implements OnInit {

  word$:Observable<Word> = new Observable<Word>();
  wordToDelete$:BehaviorSubject<Word> = new BehaviorSubject<Word>({createdAt:'',name:'',translate:'',wordType:'noun',examples:[]});

  constructor(
    private readonly store: Store
  ) { }

  ngOnInit(): void {
    this.word$ = this.store.select(selectWordModalWord);
    this.word$.subscribe(value => this.wordToDelete$.next(value))
  }

  deleteWord(){
    this.store.dispatch(deleteWord({word: this.wordToDelete$.getValue()}));
  }
}
