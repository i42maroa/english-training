import { Word } from "./word.interface";

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
    showEditButtons:boolean
}

export const PREDIFINED_WORD_STATE:WordState = {
    loading:false, 
    words:[],
    modalWord:{
        show:false,
        type: 'new'
    },
    showAddButton:true,
    showEditButtons:false
}