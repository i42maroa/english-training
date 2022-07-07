import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Word } from 'src/app/shared/models/word.interface';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';

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
      return collectionData(place) as Observable<Word[]>
    }
 
}
