import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WordService } from 'src/app/core/services/word.service';
import { Word } from 'src/app/shared/models/word.interface';
import { selectShowModalWord, selectWords } from 'src/app/state/selectors/words.selectors';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  showModal$:Observable<boolean> = new Observable<boolean>();
  wordList$:Observable<ReadonlyArray<Word>> = new Observable<ReadonlyArray<Word>>();

  constructor(
    private readonly store:Store,
    private readonly word:WordService
  ) { }

  ngOnInit(): void {
    this.showModal$ = this.store.select(selectShowModalWord);
    this.wordList$= this.store.select(selectWords);
  }

  export(){
    this.wordList$.subscribe(words => this.word.exportPdf(words as Word[]))
  }
}
