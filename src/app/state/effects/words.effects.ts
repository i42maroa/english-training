import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, switchMap, tap, mergeMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { WordService } from 'src/app/core/services/word.service';
import { Word } from 'src/app/shared/models/word.interface';
import { addedWord, addWord, addWordError, deletedWord, deleteExampleWord, deleteWord, deleteWordError, exportedPDF, exportPDF, exportPDFError, goToDetailWordPage, loadWord, loadWords, loadWordsError, modifiedWord, modifiedWordError, modifyWord, nextTypeWord, prevTypeWord, retrieveWordDetail, retrieveWordList } from '../actions/words.actions';

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
        map(_ => {
          this.router.navigate(['/'])
          return deletedWord({word:resp.word})}),
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

  exportPDF$ = createEffect(() => this.actions$.pipe(
    ofType(exportPDF),
    mergeMap(data => this.wordsService.exportPdf(data.words as Word[])
      .pipe(
        map(() =>{
          this.notificationService.showSuccess('', 'List words exported to PDF');
          return exportedPDF()}),
        catchError(() => of(exportPDFError()))
      ))
    )
  );

  exportPDFError$ = createEffect(() => this.actions$.pipe(
    ofType(exportPDFError),
    tap( () => this.notificationService.showError('', 'Can not export to PDF')))
  );


  goToDetailWordPage$ = createEffect(() => this.actions$.pipe(
    ofType(goToDetailWordPage),
    map( (word) => {
      this.router.navigate(['/','detail', word.word.id!]);
      return loadWords();
    })
   )
  );

  loadWord$ = createEffect(() => this.actions$.pipe(
    ofType(loadWord),
    switchMap((status) => this.wordsService.getWord(status.wordId).pipe(
        map(word =>{
          return retrieveWordDetail({word})
        } ),
        catchError(error => of(loadWordsError({error})))
      ))
    )
  );






  constructor(
    private actions$: Actions,
    private wordsService: WordService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
}
