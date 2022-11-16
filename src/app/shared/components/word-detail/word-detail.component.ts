import { Component, OnInit } from '@angular/core';
import { ExamplePhrases, Word } from '../../models/word.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { selectWordDetail, selectShowEditButtons } from 'src/app/state/selectors/words.selectors';
import { Store } from '@ngrx/store';
import { closeEditButtons, deleteExampleWord, modalAddExample, modalDeleteExample, modalDeleteWord, modalModifyExample, modalModifyWord, modifyExampleWord, showEditButtons } from 'src/app/state/actions/words.actions';

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.scss']
})
export class WordDetailComponent implements OnInit {

  word$:Observable<Word> = new Observable<Word>();
  wordLoaded$:BehaviorSubject<Word> = new BehaviorSubject<Word>({createdAt:'',name:'',translate:'',wordType:'noun',examples:[]});
  showEditButtons$:Observable<boolean> = new Observable<boolean>();

  constructor(
    private readonly store: Store
  ) { }

  ngOnInit(): void {
    this.word$ = this.store.select(selectWordDetail);
    this.word$.subscribe(word => this.wordLoaded$.next(word));
    this.showEditButtons$ = this.store.select(selectShowEditButtons);
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
    this.store.dispatch(modalDeleteWord({word}));
  }

  showModifyButtonsExample(){
    this.store.dispatch(showEditButtons());
  }

  unShowModifyButtonsExample(){
    this.store.dispatch(closeEditButtons());
  }

  modifyExample(index:number, example:ExamplePhrases){
    this.store.dispatch(modalModifyExample({index, example}));
  }

  deleteExample(index:number){
    this.store.dispatch(modalDeleteExample({index}));
  }
}
