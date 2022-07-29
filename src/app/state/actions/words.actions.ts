import { createAction, props } from '@ngrx/store';
import { Word } from 'src/app/shared/models/word.interface';

export const modalAddWord = createAction('[Modal word] show modal word');
export const closeAddModalWord = createAction('[Modal word] close add modal word');
export const modalModifyWord = createAction('[Modal word] show modify modal word', props<{word:Word}>());
export const closeModifyModalWord = createAction('[Modal word] close modify modal word');

export const showEditButtons = createAction('[Edit buttons] show edit buttons');
export const closeEditButtons = createAction('[Edit buttons] close edit buttons');

export const addWord = createAction('[Word list] try add word', props<{word:Word}>());
export const addedWord = createAction('[Word list] word added');

export const modifyWord = createAction('[Word list] try modify word', props<{word:Word}>());
export const modifiedWord = createAction('[Word list] word modified');

export const deleteWord = createAction('[Word list] try delete word', props<{idWord:string}>());
export const deletedWord = createAction('[Word list] word deleted');

export const loadWords = createAction('[Word list] Load words');
export const retrieveWordList = createAction('[Word list] retrieve words success', props<{words: ReadonlyArray<Word>}>());