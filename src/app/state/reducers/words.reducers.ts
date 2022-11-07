import { createReducer, on } from '@ngrx/store';
import { WORD_TYPE, WORD_TYPE_SEARCH } from 'src/app/shared/models/word.interface';
import { PREDIFINED_WORD_STATE, WordState } from 'src/app/shared/models/word.state';
import { addedWord, modalAddWord,  loadWords, modalModifyWord, retrieveWordList, addWord, modifyWord, modifiedWord, deleteWord, deletedWord, showEditButtons, closeEditButtons, nextTypeWord, prevTypeWord, exportPDF, exportedPDF, exportPDFError, closeModal, modalDeleteWord, goToDetailWordPage } from '../actions/words.actions';

export const initialState:WordState = PREDIFINED_WORD_STATE;

export const wordReducer = createReducer(
  initialState,
  on(modalAddWord, (state) => {
    return {...state, showAddButton:false, modalWord:{show:true,type:'new'} }
  }),
  on(modalDeleteWord, (state, {word}) => {
    return {...state, showAddButton:false, modalWord:{show:true,type:'delete', wordPrecharged:word} }
  }),
  on(closeModal, (state) => {
    return {...state, showAddButton:true, modalWord:{show:false, type:'new'} }
  }),
  on(modalModifyWord, (state, {word}) => {
    return {...state, showAddButton:false, modalWord:{show:true,type:'modify', wordPrecharged:word} }
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
    return {...state, loading:true, modalWord:{show:false,type:'new'} }
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
    const new_index = (state.typeWordSearch + 1) % WORD_TYPE_SEARCH.length;
    return {...state, typeWordSearch: new_index, showEditButtons:false, showAddButton:true }
  }),
  on(prevTypeWord, (state) => {
    const new_index = state.typeWordSearch === 0 ?  WORD_TYPE_SEARCH.length - 1 : state.typeWordSearch - 1;
    return {...state, typeWordSearch: new_index, showEditButtons:false, showAddButton:true}
  }),
  on(exportPDF, (state, {words}) => {
    return {...state, loading:true }
  }),
  on(exportedPDF, (state) => {
    return {...state, loading:false }
  }),
  on(exportPDFError, (state) => {
    return {...state, loading:false }
  }),
  on(goToDetailWordPage, (state, {word}) => {
    return {...state, wordDetail:word }
  })
);

