import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, exhaustMap, mergeMap } from 'rxjs/operators';
import { WordService } from 'src/app/core/services/word.service';
import { addedWord, addWord, deletedWord, deleteWord, loadWords, modifiedWord, modifyWord, nextTypeWord, prevTypeWord, retrieveWordList } from '../actions/words.actions';

@Injectable()
export class WordEffects {

  prevTypeWord$ = createEffect(() => this.actions$.pipe(
    ofType(prevTypeWord),
    mergeMap( _ => this.wordsService.getListWordsByType()
      .pipe(
        map(words => retrieveWordList({words})),
        catchError(() => EMPTY)
      ))
    )
  );

  nextTypeWord$ = createEffect(() => this.actions$.pipe(
    ofType(nextTypeWord),
    mergeMap( _ => this.wordsService.getListWordsByType()
      .pipe(
        map(words => retrieveWordList({words})),
        catchError(() => EMPTY)
      ))
    )
  );

  loadWords$ = createEffect(() => this.actions$.pipe(
    ofType(loadWords),
    exhaustMap(type => this.wordsService.getListWordsByType()
      .pipe(
        map(words => retrieveWordList({words})),
        catchError(() => EMPTY)
      ))
    )
  );

  addWord$ = createEffect(() => this.actions$.pipe(
    ofType(addWord),
    exhaustMap(resp => this.wordsService.saveWord(resp.word)
      .pipe(
        map(_ => addedWord()),
        catchError(() => EMPTY)
      ))
    )
  );

  updateWord$ = createEffect(() => this.actions$.pipe(
    ofType(modifyWord),
    exhaustMap(resp => this.wordsService.updateWord(resp.word)
      .pipe(
        map(_ => modifiedWord()),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteWord$ = createEffect(() => this.actions$.pipe(
    ofType(deleteWord),
    exhaustMap(resp => this.wordsService.deleteWord(resp.idWord)
      .pipe(
        map(_ => deletedWord()),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private wordsService: WordService
  ) {}
}
