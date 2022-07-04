import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-word-modal',
  templateUrl: './new-word-modal.component.html',
  styleUrls: ['./new-word-modal.component.scss']
})
export class NewWordModalComponent implements OnInit {

  form!:FormGroup

  constructor(
    private readonly formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      inputWord: new FormControl(''),
      translateWord: new FormControl(''),
    });
  }

}
