import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { WordService } from 'src/app/core/services/word.service';
import { addedWord, addWord, deletedWord, deleteWord, loadWords, modifiedWord, modifyWord, retrieveWordList } from '../actions/words.actions';
 
@Injectable()
export class WordEffects {
 
  loadWords$ = createEffect(() => this.actions$.pipe(
    ofType(loadWords),
    exhaustMap(() => this.wordsService.getListWords()
      .pipe(
        map(words => (retrieveWordList({words}))),
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