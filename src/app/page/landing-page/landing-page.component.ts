import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  showNewWord:boolean = false;
  showListWords:boolean = false;
  constructor(
  ) { }

  ngOnInit(): void {
  }

  showNewWordModal(){
    this.showNewWord = true;
    this.showListWords = false;
    console.log("change")
  }

  showListWordsModal(){
    this.showListWords = true;
    this.showNewWord = false;
  }

}
