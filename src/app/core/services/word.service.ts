import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Word } from 'src/app/shared/models/word.interface';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor() { }

  wordList:Word[] = [];

  saveWord(newWord:Word){
    this.wordList.push(newWord);
  }

  getListWords(): Observable<Word[]>{
    return of(this.wordList);
  }
}
