import { createReducer, on } from '@ngrx/store';
import { Word } from 'src/app/shared/models/word.interface';
import { WordState } from 'src/app/shared/models/word.state';
import { addedWord, addWord, loadWords, retrieveWordList } from '../actions/words.actions';

export const initialState:WordState = { loading:true, words:[]};

export const wordReducer = createReducer(
  initialState,
  // on(addedWord, (oldState, {word}) =>{
  //   return [...oldState, ...[word]]
  // }),
  on(loadWords, (state) => {
    return {...state, loading:true }
  }),
  on(retrieveWordList, (state, {words}) => {
    return {...state, loading:false, words}
  })
);

