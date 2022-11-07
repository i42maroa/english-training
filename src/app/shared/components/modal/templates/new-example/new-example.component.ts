import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExamplePhrases } from 'src/app/shared/models/word.interface';

@Component({
  selector: 'app-new-example',
  templateUrl: './new-example.component.html',
  styleUrls: ['./new-example.component.scss']
})
export class NewExampleComponent implements OnInit {

  form!:FormGroup;
  modalTitle:string = '';
  sendButton:boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      original: new FormControl('', Validators.required),
      translation: new FormControl('', Validators.required)
    });
    this.form.valueChanges.subscribe(_ => this.sendButton = !this.form.valid);
    this.modalTitle = 'Add new phrase example';
  }

  saveExample(){
    const example:ExamplePhrases = {
        original:this.form.value.original,
        translation:this.form.value.translation
    }


  }



}
