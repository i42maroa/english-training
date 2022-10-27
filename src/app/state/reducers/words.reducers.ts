import { createReducer, on } from '@ngrx/store';
import { WORD_TYPE } from 'src/app/shared/models/word.interface';
import { PREDIFINED_WORD_STATE, WordState } from 'src/app/shared/models/word.state';
import { addedWord, modalAddWord,  loadWords, modalModifyWord, retrieveWordList, addWord, modifyWord, modifiedWord, deleteWord, deletedWord, showEditButtons, closeEditButtons, closeAddModalWord, closeModifyModalWord, nextTypeWord, prevTypeWord } from '../actions/words.actions';

export const initialState:WordState = PREDIFINED_WORD_STATE;

export const wordReducer = createReducer(
  initialState,
  on(modalAddWord, (state) => {
    return {...state, showAddButton:false, modalWord:{show:true,type:'new'} }
  }),
  on(closeAddModalWord, (state) => {
    return {...state, showAddButton:true, modalWord:{show:false,type:'new'} }
  }),
  on(modalModifyWord, (state, {word}) => {
    return {...state, showAddButton:false, modalWord:{show:true,type:'modify', wordPrecharged:word} }
  }),
  on(closeModifyModalWord, (state) => {
    return {...state, modalWord:{show:false,type:'modify'} }
  }),
  on(showEditButtons, (state) => {
    return {...state, showEditButtons:true, showAddButton:false }
  }),
  on(closeEditButtons, (state) => {
    return {...state, showEditButtons:false, showAddButton:true }
  }),
  on(addWord, (state) => {
    return {...state, loading:true, showAddButton:true, modalWord:{show:false,type:'new'} }
  }),
  on(addedWord, (state) => {
    return {...state, loading:false, showAddButton:true, modalWord:{show:false,type:'new'} }
  }),
  on(modifyWord, (state) => {
    return {...state, loading:true, modalWord:{show:false,type:'modify'} }
  }),
  on(modifiedWord, (state) => {
    return {...state, loading:false, modalWord:{show:false,type:'new'} }
  }),
  on(deleteWord, (state) => {
    return {...state, loading:true }
  }),
  on(deletedWord, (state) => {
    return {...state, loading:false }
  }),
  on(loadWords, (state) => {
    return {...state, loading:true }
  }),
  on(retrieveWordList, (state, {words}) => {
    return {...state, loading:false, words}
  }),
  on(nextTypeWord, (state) => {
    const index = WORD_TYPE.findIndex(value => value.value === state.typeWordSearch);
    const new_index = (index + 1) % WORD_TYPE.length;
    return {...state, typeWordSearch: WORD_TYPE[new_index].value }
  }),
  on(prevTypeWord, (state) => {
    const index = WORD_TYPE.findIndex(value => value.value === state.typeWordSearch);
    const new_index = index === 0 ?  WORD_TYPE.length - 1 : (index - 1) % WORD_TYPE.length; 
    return {...state, typeWordSearch: WORD_TYPE[new_index].value}
  })
);

