import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/core/services/firestore/firestore.service';
import { loadWords, retrieveWordList } from 'src/app/state/actions/words.actions';
import { selectWords, selectWordsFeature } from 'src/app/state/selectors/words.selectors';
import { Word } from '../../models/word.interface';

@Component({
  selector: 'app-list-words',
  templateUrl: './list-words.component.html',
  styleUrls: ['./list-words.component.scss']
})
export class ListWordsComponent implements OnInit {

  @Output() showModal:EventEmitter<boolean> = new EventEmitter<boolean>();

  wordsList:Word[] = [];
  wordList$:Observable<any> = new Observable();
  editionMode:boolean = true;
  isDeleteModalShow:boolean = false;

  constructor(
    private readonly firestore:FirestoreService,
    private readonly store:Store
  ) { 
    this.wordList$ = this.store.select(selectWords);
  }

  ngOnInit(): void {
    this.store.dispatch(loadWords());
  }

  updateWord(word:any){
    this.showModal.emit(true);
  }

  async deleteWord(id:string){
    const resp = await this.firestore.deleteWord(id);
  }

  showDeleteModal(){
    this.isDeleteModalShow = true;
  }

}
