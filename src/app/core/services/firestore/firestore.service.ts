import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Word } from 'src/app/shared/models/word.interface';
import { Firestore, collectionData, collection, addDoc, deleteDoc, orderBy, doc, } from '@angular/fire/firestore';
import { limit, query, updateDoc } from 'firebase/firestore';

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

    getWord(){
      const place = collection(this.firestore, 'word', );
      // const q = query(place, orderBy("name"), limit(3));
      //const q = query(citiesRef, where("population", ">", 100000), orderBy("population"), limit(2));
      const q = query(place, orderBy("name", "asc"));
      return collectionData(q, {idField:'id'} )
    }

    deleteWord(id:string){
      const place = doc(this.firestore, `word/${id}`);
      return deleteDoc(place);  
    }

    updateWord(word:Word){
      const place = doc(this.firestore, `word/${word.id!}`);
      return updateDoc(place, {...word})
    }
}
