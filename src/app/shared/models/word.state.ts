import { ExamplePhrases, Word, WordTypeSearch, WORD_TYPE_SEARCH } from "./word.interface";

export type ModalType = 'modify' | 'new' | 'delete' | 'new-example' | 'delete-example' | 'modify-example'

export interface ModalState{
    show:boolean,
    type: ModalType,
    wordPrecharged?:Word,
    examplePrecharged?:ExamplePhrases,
    indexExample?:number
}

const mockWord:Word = {
  createdAt:"",
  examples:[],
  name:'',
  translate:'',
  wordType:'noun',
  moreInfo:'',
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
