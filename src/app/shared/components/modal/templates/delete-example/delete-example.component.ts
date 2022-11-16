import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { ExamplePhrases, Word } from 'src/app/shared/models/word.interface';
import { deleteExampleWord, modifyWord } from 'src/app/state/actions/words.actions';
import { selectExampleIndexToDelete, selectPhraseExampleSelect, selectWordDetail, selectWordModalWord } from 'src/app/state/selectors/words.selectors';

@Component({
  selector: 'app-delete-example',
  templateUrl: './delete-example.component.html',
  styleUrls: ['./delete-example.component.scss']
})
export class DeleteExampleComponent implements OnInit {

  phraseExample$:Observable<ExamplePhrases> = new Observable<ExamplePhrases>();
  exampleIndexToDelete$:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  word$:Observable<Word> = new Observable<Word>();
  wordDetail$:BehaviorSubject<Word> = new BehaviorSubject<Word>({createdAt:'',name:'',translate:'',wordType:'noun',examples:[]});

  constructor(
    private readonly store: Store
  ) { }

  ngOnInit(): void {
    this.phraseExample$ = this.store.select(selectPhraseExampleSelect);
    this.store.select(selectExampleIndexToDelete).subscribe(exampleIndex => this.exampleIndexToDelete$.next(exampleIndex));
    this.word$ = this.store.select(selectWordDetail);
    this.word$.subscribe(word => this.wordDetail$.next(word));
  }

  deleteExample(){
    this.store.dispatch(modifyWord({word:this.deleteExampleByIndex()}));
  }

  deleteExampleByIndex(): Word{
    const examples = Object.assign([], this.wordDetail$.getValue().examples);
    const indexToDelete = this.exampleIndexToDelete$.getValue();
    const newExamples:ExamplePhrases[] = []
    examples.forEach((ex, index) => index !== indexToDelete && newExamples.push(ex));
    const word = Object.assign({}, this.wordDetail$.getValue(), {examples:newExamples});
    return word;
  }
}
