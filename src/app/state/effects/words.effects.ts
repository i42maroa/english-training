import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, catchError, exhaustMap, mergeMap, concatMap, switchMap, tap } from 'rxjs/operators';
import { WordService } from 'src/app/core/services/word.service';
import { addedWord, addWord, deletedWord, deleteWord, loadWords, loadWordsError, modifiedWord, modifyWord, nextTypeWord, prevTypeWord, retrieveWordList } from '../actions/words.actions';

@Injectable()
export class WordEffects {


  prevTypeWord$ = createEffect(() => this.actions$.pipe(
    ofType(prevTypeWord),
    map( () => loadWords()))
  );

  nextTypeWord$ = createEffect(() => this.actions$.pipe(
    ofType(nextTypeWord),
    map(() => loadWords()))
  );

  loadWords$ = createEffect(() => this.actions$.pipe(
    ofType(loadWords),
    switchMap(() => this.wordsService.getListWordsByType().pipe(
        map(words => retrieveWordList({words})),
        catchError((error) => of(loadWordsError({error})))
      ))
    )
  );

  loadWordsError$ = createEffect(() => this.actions$.pipe(
    ofType(loadWordsError),
    tap((error) =>  console.log(error) ))
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

  addedWord$ = createEffect(() => this.actions$.pipe(
    ofType(addedWord),
    map( () => loadWords()))
  );

  modifiedWord$ = createEffect(() => this.actions$.pipe(
    ofType(modifiedWord),
    map( () => loadWords()))
  );

  deletedWord$ = createEffect(() => this.actions$.pipe(
    ofType(deletedWord),
    map( () => loadWords()))
  );

  constructor(
    private actions$: Actions,
    private wordsService: WordService
  ) {}
}
