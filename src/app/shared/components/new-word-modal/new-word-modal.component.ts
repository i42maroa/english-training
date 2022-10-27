import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addWord, closeAddModalWord, closeModifyModalWord, modifyWord } from 'src/app/state/actions/words.actions';
import { selectModalWord, selectWordModalWordId } from 'src/app/state/selectors/words.selectors';
import { Word, WordType, WORD_TYPE } from '../../models/word.interface';

const REVERSO_URL = 'https://www.reverso.net/traducci%C3%B3n-texto#sl=eng&tl=spa&text=';

@Component({
  selector: 'app-new-word-modal',
  templateUrl: './new-word-modal.component.html',
  styleUrls: ['./new-word-modal.component.scss']
})
export class NewWordModalComponent implements OnInit {

  form!:FormGroup
  searchText:string = REVERSO_URL;
  sendButton:boolean = true;
  translateButton:boolean = true;
  modalTitle:string = "";
  wordPreloaded:Observable<Word> = new Observable<Word>();

  isMod:boolean = false;
  idPrecharge?:string = "";

  optionSelect: {label:string; value:WordType}[] = WORD_TYPE;

  constructor(
    private readonly store:Store
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      inputWord: new FormControl('', Validators.required),
      translateWord: new FormControl('', Validators.required),
      typeWord: new FormControl('', Validators.required),
    });

    this.form.valueChanges.subscribe(_=>{
      this.sendButton = !this.form.valid;
      this.translateButton = !this.form.value.inputWord ==! '';
      this.searchText = REVERSO_URL + this.form.value.inputWord 
    });
    
    this.store.select(selectModalWord).subscribe( modalStatus => {
      
      this.modalTitle = modalStatus.type === 'new'? "Add new word" : "Modify word";
      this.isMod = modalStatus.type === 'new'? false:true;

      if(modalStatus.wordPrecharged){
        this.form.patchValue({
          inputWord: modalStatus.wordPrecharged!.name,
          translateWord: modalStatus.wordPrecharged!.translate,
          typeWord: modalStatus.wordPrecharged!.worldType
        })

        this.idPrecharge = modalStatus.wordPrecharged!.id!
      }  
    })
  }

  saveWord(){
    const dateToday = new Date();
    const newWord:Word = {
      id: this.isMod? this.idPrecharge : "",
      translate: this.form.value.translateWord.toLowerCase(),
      createdAt: dateToday.toDateString(),
      name:this.form.value.inputWord.toLowerCase(),
      worldType:this.form.value.typeWord
    };

    this.isMod ?
      this.store.dispatch(modifyWord({word:newWord})):
      this.store.dispatch(addWord({word:newWord}))
  }

  closeModal(){
    this.isMod ?
      this.store.dispatch(closeModifyModalWord()):
      this.store.dispatch(closeAddModalWord());
  }
}
