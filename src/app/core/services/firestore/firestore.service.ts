import { Injectable } from '@angular/core';
import { Word, WORD_TYPE_SEARCH } from 'src/app/shared/models/word.interface';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { selectWordTypeSearch } from 'src/app/state/selectors/words.selectors';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  wordType$:BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private readonly store:Store,
    private db: AngularFirestore
  ) {
    this.store.select(selectWordTypeSearch).subscribe(type => {
      console.log("constructor - search type:" + type)
      console.log("constructor - search type:" + WORD_TYPE_SEARCH[type].value)
      this.wordType$.next(type)
    });
  }

    addWord(word:Word){
      return this.db.collection('word').add(word);
    }

    getWordByType(){
      const type = this.wordType$.getValue();
      console.log("search type:" + type)
      console.log("search type:" + WORD_TYPE_SEARCH[type].value)
      return type === 0 ?
        this.db.collection('word').valueChanges({idField:'id'}):
        this.db.collection('word', ref => ref.where('wordType', '==', WORD_TYPE_SEARCH[type].value).orderBy("name", "asc")).valueChanges({idField:'id'});
    }

    deleteWord(id:string){
      return this.db.collection(`word`).doc(id).delete();
    }

    updateWord(word:Word){
      return this.db.collection(`word`).doc(word.id!).update({...word});
    }
}
