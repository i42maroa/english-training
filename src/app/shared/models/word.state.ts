import { ExamplePhrases, Word, WordTypeSearch, WORD_TYPE_SEARCH } from "./word.interface";

export interface ModalState{
    show:boolean,
    type: 'modify' | 'new' | 'delete' | 'new-example' | 'delete-example' | 'modify-example',
    wordPrecharged?:Word,
    examplePrecharged?:ExamplePhrases,
    indexExample?:number
}

const mockWord:Word = {
  createdAt:"20-02-2022",
  examples:[
    {
      original:'Hi, nice to meet you',
      translation:'Hola, encantado de conocerte'
    },
    {
      original:'Hi, nice to meet you',
      translation:'Hola, encantado de conocerte'
    }
  ],
  name:'avoid',
  translate:'evitar',
  wordType:'noun',
  moreInfo:'Es un saludo que normalmente se usa',
}

export interface WordState{
    loading:boolean,
    words:ReadonlyArray<Word>,
    modalWord:ModalState,
    showAddButton:boolean,
    showEditButtons:boolean,
    typeWordSearch:number,
    wordDetail?:Word
}

export const PREDIFINED_WORD_STATE:WordState = {
    loading:false,
    words:[],
    modalWord:{
        show:false,
        type: 'new',
        indexExample:0
    },
    showAddButton:true,
    showEditButtons:false,
    typeWordSearch: 0,
    wordDetail:mockWord
}


