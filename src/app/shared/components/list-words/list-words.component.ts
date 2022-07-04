import { Component, OnInit } from '@angular/core';
import { Word } from '../../models/word.interface';

@Component({
  selector: 'app-list-words',
  templateUrl: './list-words.component.html',
  styleUrls: ['./list-words.component.scss']
})
export class ListWordsComponent implements OnInit {

  wordsList:Word[] = [];

  constructor() { }

  ngOnInit(): void {
    this.wordsList = [
      {
        name:"do",
        translate:"hacer",
        createdAt:"04/07/2022"
      },
      {
        name:"often",
        translate:"a menudo",
        createdAt:"04/07/2022"
      }
    ]
  }

}
