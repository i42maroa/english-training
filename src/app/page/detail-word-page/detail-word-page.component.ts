import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { Word } from 'src/app/shared/models/word.interface';
import { modalAddExample } from 'src/app/state/actions/words.actions';
import { selectWordModalWord } from 'src/app/state/selectors/words.selectors';

@Component({
  selector: 'app-detail-word-page',
  templateUrl: './detail-word-page.component.html',
  styleUrls: ['./detail-word-page.component.scss']
})
export class DetailWordPageComponent implements OnInit {

  word$:Observable<Word> = new Observable<Word>();
  constructor(
    private readonly store: Store
  ) { }

  ngOnInit(): void {
    this.word$ = this.store.select(selectWordModalWord);
  }



}
