import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  saveWord(newWord:Word):Observable<any>{
    return this.firestore.post(this.wordUrl, newWord);
  }

  getListWords(): Observable<Word[]>{
    return this.firestore.get(this.wordUrl);
  }
}
