import { createReducer, on } from '@ngrx/store';
import { Word } from 'src/app/shared/models/word.interface';
import { addWord, retrieveWordList } from '../actions/words.actions';

export const initialState:ReadonlyArray<Word> = [];

export const wordReducer = createReducer(
  initialState,
  on(addWord, (oldState, {word}) =>{
    return [...oldState, ...[word]]
  }),
  on(retrieveWordList, (oldState, {words}) => {
    return [...oldState, ...words]
  })
);