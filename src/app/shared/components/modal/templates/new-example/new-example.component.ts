import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExamplePhrases, Word } from 'src/app/shared/models/word.interface';
import { modifyWord } from 'src/app/state/actions/words.actions';
import { selectExampleIndexToDelete, selectExamplePrecharged, selectModalWord, selectPhraseExampleSelect, selectWordDetail } from 'src/app/state/selectors/words.selectors';

@Component({
  selector: 'app-new-example',
  templateUrl: './new-example.component.html',
  styleUrls: ['./new-example.component.scss']
})
export class NewExampleComponent implements OnInit {

  form!:FormGroup;
  modalTitle:string = '';
  sendButton:boolean = true;
  word$:Observable<Word> = new Observable<Word>();
  isMod:boolean = false;

  examplePreCharged$:BehaviorSubject<ExamplePhrases> = new BehaviorSubject<ExamplePhrases>({original:'', translation:''});
  wordDetail$:BehaviorSubject<Word> = new BehaviorSubject<Word>({createdAt:'',name:'',translate:'',wordType:'noun',examples:[]});

  phraseExample$:Observable<ExamplePhrases> = new Observable<ExamplePhrases>();
  exampleIndexToDelete$:BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private readonly store:Store
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      original: new FormControl('', Validators.required),
      translation: new FormControl('', Validators.required)
    });
    this.form.valueChanges.subscribe(_ => this.sendButton = !this.form.valid);
    this.word$ = this.store.select(selectWordDetail);
    this.word$.subscribe(word => this.wordDetail$.next(word));

    this.store.select(selectModalWord).subscribe( modalStatus => {
      this.modalTitle = modalStatus.type === 'new'? 'Add new phrase example' : 'Modify phrase example';
      this.isMod = modalStatus.type === 'new'? false:true;
      this.isMod && this.preloadExampleToModify();
    })

    this.phraseExample$ = this.store.select(selectPhraseExampleSelect);
    this.store.select(selectExampleIndexToDelete).subscribe(exampleIndex => this.exampleIndexToDelete$.next(exampleIndex));
  }

  preloadExampleToModify(){
    this.store.select(selectExamplePrecharged).subscribe( example => this.examplePreCharged$.next(example));
    const example = this.examplePreCharged$.getValue();
    this.form.patchValue({ ...example })
  }

  saveExample(){
    this.store.dispatch(modifyWord({word: this.isMod? this.modifyPreviousObject() : this.saveExamplesIntoObject() }));
  }

  saveExamplesIntoObject(): Word{
    const example:ExamplePhrases = {
      original:this.form.value.original,
      translation:this.form.value.translation
    }
    const examples = Object.assign([], this.wordDetail$.getValue().examples);
    examples.push(example)
    const word = Object.assign({}, this.wordDetail$.getValue(), {examples});

    return word;
  }

  modifyPreviousObject(){
    const examples = Object.assign([], this.wordDetail$.getValue().examples);
    const indexToDelete = this.exampleIndexToDelete$.getValue();
    const newExamples:ExamplePhrases[] = []
    examples.forEach((ex, index) => index === indexToDelete ? newExamples.push({ ...this.form.value }) : newExamples.push(ex));
    const word = Object.assign({}, this.wordDetail$.getValue(), {examples:newExamples});
    return word;
  }

}
