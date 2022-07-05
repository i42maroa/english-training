import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  showModal!:boolean;

  constructor(
  ) { }

  ngOnInit(): void {
    this.showModal = false;
  }

  addModal(show:boolean){
    this.showModal = show;
  }

}
