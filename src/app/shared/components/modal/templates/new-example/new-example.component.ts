import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExamplePhrases, Word } from 'src/app/shared/models/word.interface';
import { modifyWord } from 'src/app/state/actions/words.actions';
import { selectWordDetail } from 'src/app/state/selectors/words.selectors';

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
  wordDetail$:BehaviorSubject<Word> = new BehaviorSubject<Word>({createdAt:'',name:'',translate:'',wordType:'noun',examples:[]});

  constructor(
    private readonly store:Store
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      original: new FormControl('', Validators.required),
      translation: new FormControl('', Validators.required)
    });
    this.form.valueChanges.subscribe(_ => this.sendButton = !this.form.valid);
    this.modalTitle = 'Add new phrase example';
    this.word$ = this.store.select(selectWordDetail);
    this.word$.subscribe(word => this.wordDetail$.next(word));
  }

  saveExample(){
    this.store.dispatch(modifyWord({word:this.saveExamplesIntoObject()}));
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

}
