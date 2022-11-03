import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, switchMap, tap } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { WordService } from 'src/app/core/services/word.service';
import { addedWord, addWord, addWordError, deletedWord, deleteWord, deleteWordError, loadWords, loadWordsError, modifiedWord, modifiedWordError, modifyWord, nextTypeWord, prevTypeWord, retrieveWordList } from '../actions/words.actions';

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
        catchError(error => of(loadWordsError({error})))
      ))
    )
  );

  loadWordsError$ = createEffect(() => this.actions$.pipe(
    ofType(loadWordsError),
    tap((error) =>  this.notificationService.showError('', "Words can not be loaded")))
  );

  addWord$ = createEffect(() => this.actions$.pipe(
    ofType(addWord),
    exhaustMap(resp => this.wordsService.saveWord(resp.word)
      .pipe(
        map( _ => addedWord({word:resp.word})),
        catchError(error => of(addWordError({error, word:resp.word})))
      ))
    )
  );

  addWordError$ = createEffect(() => this.actions$.pipe(
    ofType(addWordError),
    tap(({error, word}) => this.notificationService.showError(word.name, ` can not be added`) ))
  );

  updateWord$ = createEffect(() => this.actions$.pipe(
    ofType(modifyWord),
    exhaustMap(resp => this.wordsService.updateWord(resp.word)
      .pipe(
        map(_ => modifiedWord({word:resp.word})),
        catchError(error => of(modifiedWordError({error, word:resp.word})))
      ))
    )
  );

  modifiedWordError$ = createEffect(() => this.actions$.pipe(
    ofType(modifiedWordError),
    tap(({error, word}) => this.notificationService.showError(word.name, ` can not be modified`) ))
  );

  deleteWord$ = createEffect(() => this.actions$.pipe(
    ofType(deleteWord),
    exhaustMap(resp => this.wordsService.deleteWord(resp.word)
      .pipe(
        map(_ => deletedWord({word:resp.word})),
        catchError(error => of(deleteWordError({error, word:resp.word})))
      ))
    )
  );

  deleteWordError$ = createEffect(() => this.actions$.pipe(
    ofType(deleteWordError),
    tap(({error, word}) => this.notificationService.showError(word.name,` can not be deleted`) ))
  );

  addedWord$ = createEffect(() => this.actions$.pipe(
    ofType(addedWord),
    map( data => {
      this.notificationService.showSuccess(data.word.name, ` added`);
      return loadWords()
    }))
  );

  modifiedWord$ = createEffect(() => this.actions$.pipe(
    ofType(modifiedWord),
    map( data => {
      this.notificationService.showSuccess(data.word.name,` modified`);
      return loadWords()
    }))
  );

  deletedWord$ = createEffect(() => this.actions$.pipe(
    ofType(deletedWord),
    map( data => {
      this.notificationService.showSuccess(data.word.name, ` deleted`);
      return loadWords()
    }))
  );

  constructor(
    private actions$: Actions,
    private wordsService: WordService,
    private notificationService: NotificationService
  ) {}
}
