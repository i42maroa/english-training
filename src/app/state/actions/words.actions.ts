import { createAction, props } from '@ngrx/store';
import { Word, WordTypeSearch } from 'src/app/shared/models/word.interface';

export const modalAddWord = createAction('[Modal word] show modal word');
export const modalDeleteWord = createAction('[Modal word] show modal delete word', props<{word:Word}>());
export const modalModifyWord = createAction('[Modal word] show modify modal word', props<{word:Word}>());

export const closeModal = createAction('[Modal word] close modal ');

export const showEditButtons = createAction('[Edit buttons] show edit buttons');
export const closeEditButtons = createAction('[Edit buttons] close edit buttons');

export const addWord = createAction('[Word list] try add word', props<{word:Word}>());
export const addedWord = createAction('[Word list] word added', props<{word:Word}>());
export const addWordError = createAction('[Word list] add word process error', props<{error:any, word:Word}>());

export const modifyWord = createAction('[Word list] try modify word', props<{word:Word}>());
export const modifiedWord = createAction('[Word list] word modified', props<{word:Word}>());
export const modifiedWordError = createAction('[Word list] word modify process error', props<{error:any, word:Word}>());

export const deleteWord = createAction('[Word list] try delete word', props<{word:Word}>());
export const deletedWord = createAction('[Word list] word deleted', props<{word:Word}>());
export const deleteWordError = createAction('[Word list] delete word process error', props<{error:any, word:Word}>());

export const loadWords = createAction('[Word list] Load words');
export const retrieveWordList = createAction('[Word list] retrieve words success', props<{words: ReadonlyArray<Word>}>());
export const loadWordsError = createAction('[Word list] Load words error', props<{error:any}>());

export const nextTypeWord = createAction('[Change word type] try next word type');
export const prevTypeWord = createAction('[Change word type] try previous word type');

export const exportPDF = createAction('[Export PDF] try export list to PDF', props<{words: ReadonlyArray<Word>}>());
export const exportedPDF = createAction('[Export PDF] export list to PDF sucsessful');
export const exportPDFError = createAction('[Export PDF] error to export PDF');
