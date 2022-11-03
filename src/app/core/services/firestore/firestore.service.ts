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

  // save last document in snapshot of items received
  lastInResponse: any = [];

  constructor(
    private readonly store:Store,
    private db: AngularFirestore
  ) {
    this.store.select(selectWordTypeSearch).subscribe(type => this.wordType$.next(type));
  }

    addWord(word:Word){
      return this.db.collection('word').add(word);
    }

    getWordByType(){
      const type = this.wordType$.getValue();
      return type === 0 ?
        this.db.collection('word', ref => ref.orderBy("name", "asc")).valueChanges({idField:'id'}):
        this.db.collection('word', ref => ref.where('wordType', '==', WORD_TYPE_SEARCH[type].value)).valueChanges({idField:'id'});
    }

    deleteWord(id:string){
      return this.db.collection(`word`).doc(id).delete();
    }

    updateWord(word:Word){
      return this.db.collection(`word`).doc(word.id!).update({...word});
    }

}
