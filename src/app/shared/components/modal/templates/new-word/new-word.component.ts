import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExamplePhrases, Word, WordType, WORD_TYPE, WORD_TYPE_SEARCH } from 'src/app/shared/models/word.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectModalWord, selectWordModalWord, selectWordTypeSearch } from 'src/app/state/selectors/words.selectors';
import { addWord,  modifyWord } from 'src/app/state/actions/words.actions';

const REVERSO_URL = 'https://www.reverso.net/traducci%C3%B3n-texto#sl=eng&tl=spa&text=';

@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.scss']
})
export class NewWordComponent implements OnInit {

  form!:FormGroup;
  searchText:string = REVERSO_URL;
  sendButton:boolean = true;
  translateButton:boolean = true;
  wordPreloaded:Observable<Word> = new Observable<Word>();
  wordType$:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  wordPreLoaded$:BehaviorSubject<Word> = new BehaviorSubject<Word>({createdAt:'',name:'',translate:'',wordType:'noun',examples:[]});

  isMod:boolean = false;
  idPrecharge?:string = "";
  modalTitle:string = '';
  examples:ExamplePhrases[]= []

  optionSelect: {label:string; value:WordType}[] = WORD_TYPE;

  constructor(
    private readonly store:Store
  ) {
    this.store.select(selectWordTypeSearch).subscribe(type => this.wordType$.next(type));
   }

  ngOnInit(): void {
    this.form = new FormGroup({
      inputWord: new FormControl('', Validators.required),
      translateWord: new FormControl('', Validators.required),
      typeWord: new FormControl(this.getWordTypeDefault, Validators.required),
      moreInfo: new FormControl(''),
    });

    this.form.valueChanges.subscribe(_=>{
      this.sendButton = !this.form.valid;
      this.translateButton = !this.form.value.inputWord ==! '';
      this.searchText = REVERSO_URL + this.form.value.inputWord
    });

    this.store.select(selectModalWord).subscribe( modalStatus => {
      this.modalTitle = modalStatus.type === 'new'? "Add new word" : "Modify word";
      this.isMod = modalStatus.type === 'new'? false:true;
      this.isMod && this.preloadWordToModify();
    })
  }

  preloadWordToModify(){
    this.store.select(selectWordModalWord).subscribe( word => this.wordPreLoaded$.next(word));
    const word = this.wordPreLoaded$.getValue();
    this.form.patchValue({
      inputWord: word.name,
      translateWord: word.translate,
      typeWord: word.wordType,
      moreInfo: word.moreInfo ?? ''
    })

    this.examples = word.examples;
    this.idPrecharge = word.id!;
  }

  saveWord(){
    const dateToday = new Date();
    const newWord:Word = {
      id: this.isMod? this.idPrecharge : "",
      translate: this.form.value.translateWord.toLowerCase(),
      createdAt: dateToday.toDateString(),
      name:this.form.value.inputWord.toLowerCase(),
      wordType:this.form.value.typeWord,
      moreInfo:this.form.value.moreInfo,
      examples: this.examples
    };

    this.isMod ?
      this.store.dispatch(modifyWord({word:newWord})):
      this.store.dispatch(addWord({word:newWord}))
  }



  get getWordTypeDefault():string{
    const wordTypeNumber = this.wordType$.getValue()
    return wordTypeNumber === 0 ?  WORD_TYPE_SEARCH[1].value : WORD_TYPE_SEARCH[wordTypeNumber].value;
  }

}
