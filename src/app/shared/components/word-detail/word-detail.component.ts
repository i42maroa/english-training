import { Component, OnInit } from '@angular/core';
import { Word } from '../../models/word.interface';
import { Observable } from 'rxjs';
import { selectWordDetail } from 'src/app/state/selectors/words.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.scss']
})
export class WordDetailComponent implements OnInit {

  word$:Observable<Word> = new Observable<Word>();

  constructor(
    private readonly store: Store
  ) { }

  ngOnInit(): void {
    this.word$ = this.store.select(selectWordDetail);
  }

}
