import { Component, OnInit } from '@angular/core';
import { WordService } from 'src/app/core/services/word.service';
import { Word } from '../../models/word.interface';

@Component({
  selector: 'app-list-words',
  templateUrl: './list-words.component.html',
  styleUrls: ['./list-words.component.scss']
})
export class ListWordsComponent implements OnInit {

  wordsList:Word[] = [];

  constructor(
    private readonly wordService:WordService
  ) { }

  ngOnInit(): void {
    this.wordService.getListWords().subscribe(
      dataList => this.wordsList = dataList
    )
  }

}
