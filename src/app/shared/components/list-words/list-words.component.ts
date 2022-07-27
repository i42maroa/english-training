import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/core/services/firestore/firestore.service';
import { WordService } from 'src/app/core/services/word.service';
import { loadWords, retrieveWordList } from 'src/app/state/actions/words.actions';
import { selectWords } from 'src/app/state/selectors/words.selectors';
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
    private readonly wordService:WordService,
    private readonly firestore:FirestoreService,
    private readonly store:Store
  ) { 
    this.wordList$ = this.store.select(selectWords);
  }

  ngOnInit(): void {
    // this.wordService.getListWords().subscribe(
    //   dataList =>{
    //     this.store.dispatch(retrieveWordList({words:dataList}))
    //     this.wordsList = dataList
    //   }  )
    this.store.dispatch(loadWords());
  }

  updateWord(word:any){
    this.showModal.emit(true);
  }

  async deleteWord(id:string){
    const resp = await this.firestore.deleteWord(id);
    console.log(resp)
  }

  showDeleteModal(){
    this.isDeleteModalShow = true;
  }

}
