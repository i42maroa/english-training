import { Component, OnInit } from '@angular/core';
import { Word } from '../../models/word.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { selectWordDetail } from 'src/app/state/selectors/words.selectors';
import { Store } from '@ngrx/store';
import { modalAddExample, modalDeleteWord, modalModifyWord } from 'src/app/state/actions/words.actions';

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.scss']
})
export class WordDetailComponent implements OnInit {

  word$:Observable<Word> = new Observable<Word>();
  wordLoaded$:BehaviorSubject<Word> = new BehaviorSubject<Word>({createdAt:'',name:'',translate:'',wordType:'noun',examples:[]});

  constructor(
    private readonly store: Store
  ) { }

  ngOnInit(): void {

    this.word$ = this.store.select(selectWordDetail);
    this.word$.subscribe(word => this.wordLoaded$.next(word));
  }

  addExample(){
    this.store.dispatch(modalAddExample());
  }

  modifyWord(){
    const word = this.wordLoaded$.getValue();
    this.store.dispatch(modalModifyWord({word}));
  }

  deleteWord(){
    const word = this.wordLoaded$.getValue();
    this.store.dispatch(modalDeleteWord({word}))
  }

  showModifyButtonsExample(){

  }

  modifyExample(){

  }

  deleteExample(){

  }
}
