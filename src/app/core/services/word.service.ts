import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Word } from 'src/app/shared/models/word.interface';
import { FirestoreService } from './firestore/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  readonly wordUrl = "word"

  constructor(
    private readonly firestore:FirestoreService
  ) { }

  wordList:Word[] = [];

  saveWord(newWord:Word){
    return this.firestore.addWord(newWord);
  }

  getListWords(): Observable<Word[]>{
    return this.firestore.getWord() as Observable<any>;
  }
}
