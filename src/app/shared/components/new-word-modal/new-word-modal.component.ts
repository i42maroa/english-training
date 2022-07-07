import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WordService } from 'src/app/core/services/word.service';
import { Word } from '../../models/word.interface';

const REVERSO_URL = 'https://www.reverso.net/traducci%C3%B3n-texto#sl=eng&tl=spa&text=';

@Component({
  selector: 'app-new-word-modal',
  templateUrl: './new-word-modal.component.html',
  styleUrls: ['./new-word-modal.component.scss']
})
export class NewWordModalComponent implements OnInit {

  @Output() showModal = new EventEmitter<boolean>();
  form!:FormGroup
  searchText:string = REVERSO_URL;

  sendButton:boolean = true;
  translateButton:boolean = true;

  constructor(
    private readonly wordService:WordService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      inputWord: new FormControl('', Validators.required),
      translateWord: new FormControl('', Validators.required),
    });

    this.form.valueChanges.subscribe(_=>{
      this.sendButton = !this.form.valid;
      this.translateButton = !this.form.value.inputWord ==! '';
      this.searchText = REVERSO_URL + this.form.value.inputWord });
  }

  translateWord(){
    const word = this.form.value.inputWord;
  }

  saveWord(){
    const dateToday = new Date();
    const newWord:Word ={
      translate: this.form.value.translateWord,
      createdAt: dateToday.toDateString(),
      name:this.form.value.inputWord
    } 
    ;
    this.showModal.emit(false);
    this.wordService.saveWord(newWord);
  }

  closeModal(){
    this.showModal.emit(false);
  }

}