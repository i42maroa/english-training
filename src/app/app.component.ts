import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { selectShowModalWord } from './state/selectors/words.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'english-training';

  showModal$:Observable<boolean> = new Observable<boolean>();

  constructor(private readonly store:Store) {}

  ngOnInit(): void {
    this.showModal$ = this.store.select(selectShowModalWord);
  }

}
