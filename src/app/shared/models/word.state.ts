import { Word, WordTypeSearch, WORD_TYPE_SEARCH } from "./word.interface";

export interface ModalState{
    show:boolean,
    type: 'modify' | 'new' | 'delete' | 'new-example',
    wordPrecharged?:Word
}

const mockWord:Word = {
  createdAt:"",
  examples:[],
  name:'hi',
  translate:'hola',
  wordType:'noun',
  moreInfo:'es un saludo que normalmente se usa'
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
        type: 'new'
    },
    showAddButton:true,
    showEditButtons:false,
    typeWordSearch: 0,
    wordDetail:mockWord
}


