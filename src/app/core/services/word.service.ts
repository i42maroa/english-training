import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
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
    return from(this.firestore.addWord(newWord));
  }

  updateWord(newWord:Word){
    return from(this.firestore.updateWord(newWord));
  }

  getListWords(): Observable<Word[]>{
    return from(this.firestore.getWord()) as Observable<Word[]>;
  }

  deleteWord(id:string){
    return from(this.firestore.deleteWord(id));
  }
}
