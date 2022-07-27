import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firestore/firestore.service';
import { WordService } from 'src/app/core/services/word.service';
import { Word } from '../../models/word.interface';

@Component({
  selector: 'app-list-words',
  templateUrl: './list-words.component.html',
  styleUrls: ['./list-words.component.scss']
})
export class ListWordsComponent implements OnInit {

  @Output() showModal:EventEmitter<boolean> = new EventEmitter<boolean>();

  wordsList:Word[] = [];
  editionMode:boolean = true;
  isDeleteModalShow:boolean = false;

  constructor(
    private readonly wordService:WordService,
    private readonly firestore:FirestoreService
  ) { }

  ngOnInit(): void {
    this.wordService.getListWords().subscribe(
      dataList => this.wordsList = dataList )
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
