import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { Word } from 'src/app/shared/models/word.interface';
import { exportPDF } from 'src/app/state/actions/words.actions';
import { selectShowModalWord, selectWords } from 'src/app/state/selectors/words.selectors';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  showModal$:Observable<boolean> = new Observable<boolean>();
  wordList$:Observable<ReadonlyArray<Word>> = new Observable<ReadonlyArray<Word>>();
  wordsArrayList$:BehaviorSubject<ReadonlyArray<Word>> = new BehaviorSubject<ReadonlyArray<Word>>([]);
  exportButtonDisabled:boolean = false;

  constructor(
    private readonly store:Store
  ) { }

  ngOnInit(): void {
    this.showModal$ = this.store.select(selectShowModalWord);
    this.wordList$= this.store.select(selectWords);
    this.wordList$.subscribe(words => {
      this.wordsArrayList$.next(words);
      this.exportButtonDisabled = words.length === 0;
    });
  }

  export(){
    this.store.dispatch(exportPDF({words:this.wordsArrayList$.getValue()}));
  }
}
