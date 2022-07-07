import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  readonly url="https://english-training-9d2bb-default-rtdb.europe-west1.firebasedatabase.app/datos.json";

  constructor(
    private readonly http:HttpClient
  ) { }

  save(data:any){
    this.http.post(this.url, data)
  }
}
