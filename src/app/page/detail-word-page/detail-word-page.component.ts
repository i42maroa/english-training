import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { Word } from 'src/app/shared/models/word.interface';
import { loadWord } from 'src/app/state/actions/words.actions';

@Component({
  selector: 'app-detail-word-page',
  templateUrl: './detail-word-page.component.html',
  styleUrls: ['./detail-word-page.component.scss']
})
export class DetailWordPageComponent implements OnInit {

  word$:Observable<Word> = new Observable<Word>();
  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const wordId = this.route.snapshot.params['word'];
    this.store.dispatch(loadWord({wordId}));
  }



}
