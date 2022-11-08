import { Injectable } from '@angular/core';
import { Word, WORD_TYPE_SEARCH } from 'src/app/shared/models/word.interface';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { selectWordTypeSearch } from 'src/app/state/selectors/words.selectors';
import { AngularFirestore } from '@angular/fire/compat/firestore';

const collection = "word-develop"

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  wordType$:BehaviorSubject<number> = new BehaviorSubject<number>(0);

  // save last document in snapshot of items received
  lastInResponse: any = [];

  constructor(
    private readonly store:Store,
    private db: AngularFirestore
  ) {
    this.store.select(selectWordTypeSearch).subscribe(type => this.wordType$.next(type));
  }

    addWord(word:Word){
      return this.db.collection(collection).add(word);
    }

    getWordByType(){
      const type = this.wordType$.getValue();
      return type === 0 ?
        this.db.collection(collection, ref => ref.orderBy("name", "asc")).valueChanges({idField:'id'}):
        this.db.collection(collection, ref => ref.where('wordType', '==', WORD_TYPE_SEARCH[type].value)).valueChanges({idField:'id'});
    }

    getWord(idWord:string){
      return this.db.collection(collection).doc(idWord).valueChanges({idField:'id'});
    }

    deleteWord(word:Word){
      return this.db.collection(collection).doc(word.id!).delete();
    }

    updateWord(word:Word){
      return this.db.collection(collection).doc(word.id!).update({...word});
    }

}
