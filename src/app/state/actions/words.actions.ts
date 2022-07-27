import { createAction, props } from '@ngrx/store';
import { Word } from 'src/app/shared/models/word.interface';

export const addWord = createAction('[Word list] Add word', props<{word:Word}>());
export const loadWords = createAction('[Word list] Load words');
export const retrieveWordList = createAction('[Word list] retrieve words success', 
    props<{words: ReadonlyArray<Word>}>());