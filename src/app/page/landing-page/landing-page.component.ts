import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectShowModalWord } from 'src/app/state/selectors/words.selectors';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  showModal$:Observable<boolean> = new Observable<boolean>();

  constructor(
    private readonly store:Store
  ) { }

  ngOnInit(): void {
    this.showModal$ = this.store.select(selectShowModalWord);
  }
}
