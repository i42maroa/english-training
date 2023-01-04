import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {

  form!:FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      searcher: new FormControl('')
    });
  }

  search(){
    const search = this.form.value.searcher
    
  }

}
