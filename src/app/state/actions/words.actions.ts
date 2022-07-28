import { createAction, props } from '@ngrx/store';
import { Word } from 'src/app/shared/models/word.interface';

export const addWord = createAction('[Word list] Add word');
export const addedWord = createAction('[Word list] Added word', props<{word:Word}>());
export const modWord = createAction('[Word list] Modify word', props<{word:Word}>());
export const moddedWord = createAction('[Word list] Modified word', props<{word:Word}>());
export const loadWords = createAction('[Word list] Load words');
export const retrieveWordList = createAction('[Word list] retrieve words success', props<{words: ReadonlyArray<Word>}>());