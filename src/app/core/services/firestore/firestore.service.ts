import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Word } from 'src/app/shared/models/word.interface';
import { Firestore, collectionData, collection, addDoc, deleteDoc, setDoc, doc, } from '@angular/fire/firestore';
import { updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor( 
    private readonly firestore:Firestore ) { }


    addWord(word:Word){
      const place = collection(this.firestore, 'word');
      return addDoc(place, word) 
    }

    getWord(): Observable<Word[]>{
      const place = collection(this.firestore, 'word');
      return collectionData(place, {idField:'id'}) as Observable<Word[]>
    }

    deleteWord(id:string){
      const place = doc(this.firestore, `word/${id}`);
      return deleteDoc(place);  
    }

    updateWord(word:Word){
      console.log(word)
      const place = doc(this.firestore, `word/${word.id!}`);

      console.log(place)
      return updateDoc(place, {...word})
    }
}
