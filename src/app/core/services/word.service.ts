import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Word, WordType, WordTypeSearch } from 'src/app/shared/models/word.interface';
import { FirestoreService } from './firestore/firestore.service';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(
    private readonly firestore:FirestoreService
  ) { }

  wordList:Word[] = [];

  saveWord(newWord:Word){
    return from(this.firestore.addWord(newWord));
  }

  updateWord(newWord:Word){
    return from(this.firestore.updateWord(newWord));
  }

  getListWordsByType(): Observable<Word[]>{
    return from(this.firestore.getWordByType()) as Observable<Word[]>;
  }

  deleteWord(word:Word){
    return from(this.firestore.deleteWord(word));
  }

  exportPdf(wordList:Word[]){

    //[izq,arriba, der, abajo]
    const tableBody = [[
      {text:'WORD', fontSize: 16, bold: true, color:'#661F33',  margin: [0, 5, 20, 5]},
      {text:'TRANSLATION', fontSize: 16, bold: true, color:'#661F33', margin: [0, 5, 20, 5]}
    ]]

    wordList.forEach(word =>{
      tableBody.push([
        {text:word.name, fontSize: 12, bold:false, color:'#30362F', margin: [0, 5, 20, 5]},
        {text:word.translate, fontSize: 12, bold:false, color:'#30362F',  margin: [0, 5, 20, 5]}
      ])
    })

    const pdfCreate:any = {
      content:[
        {text: 'ENGLISH TRAINING', fontSize: 32, bold: true, color:'#661F33', margin: [0, 0, 0, 20]},
        {text: 'Words List', fontSize: 18, color:'#30362F', bold: true, margin: [0, 0, 0, 20]},
        {
          style: 'tableExample',
          table: {
            body: tableBody
          },
          layout: 'noBorders'
        },
      ]
    }

    const pdf = pdfMake.createPdf(pdfCreate);
    pdf.download()
  }
}
