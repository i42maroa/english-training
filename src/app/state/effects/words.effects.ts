import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { WordService } from 'src/app/core/services/word.service';
 
@Injectable()
export class WordEffects {
 
  loadWords$ = createEffect(() => this.actions$.pipe(
    ofType('[Word list] Load words'),
    mergeMap(() => this.wordsService.getListWords()
      .pipe(
        map(words => ({ type: '[Word list] retrieve words success', words:words })),
        catchError(() => EMPTY)
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private wordsService: WordService
  ) {}
}