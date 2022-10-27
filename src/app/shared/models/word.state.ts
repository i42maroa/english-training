import { Word, WordTypeSearch, WORD_TYPE_SEARCH } from "./word.interface";

export interface ModalState{
    show:boolean,
    type: 'modify' | 'new',
    wordPrecharged?:Word
}

export interface WordState{
    loading:boolean,
    words:ReadonlyArray<Word>,
    modalWord:ModalState,
    showAddButton:boolean,
    showEditButtons:boolean,
    typeWordSearch:WordTypeSearch
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
    typeWordSearch: WORD_TYPE_SEARCH[0].value
}