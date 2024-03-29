import { createFeatureSelector, createSelector } from "@ngrx/store";
import { WORD_TYPE_SEARCH } from "src/app/shared/models/word.interface";
import { WordState } from "src/app/shared/models/word.state";

export const selectWordsFeature = createFeatureSelector<WordState>(`words`);

export const selectWords = createSelector(
    selectWordsFeature,
    (state:WordState) => state.words
)

export const selectLoading = createSelector(
    selectWordsFeature,
    (state:WordState) => state.loading
)

export const selectShowAddButton = createSelector(
    selectWordsFeature,
    (state:WordState) => state.showAddButton
)

export const selectShowEditButtons = createSelector(
    selectWordsFeature,
    (state:WordState) => state.showEditButtons
)

export const selectModalWord = createSelector(
    selectWordsFeature,
    (state:WordState) => state.modalWord
)

export const selectModalType = createSelector(
  selectWordsFeature,
  (state:WordState) => state.modalWord.type
)

export const selectShowModalWord = createSelector(
    selectWordsFeature,
    (state:WordState) => state.modalWord.show
)

export const selectWordModalWord = createSelector(
  selectWordsFeature,
  (state:WordState) => state.modalWord.wordPrecharged!
)

export const selectPhraseExampleSelect = createSelector(
  selectWordsFeature,
  (state:WordState) => state.wordDetail!.examples[state.modalWord.indexExample!]
)

export const selectExampleIndexToDelete = createSelector(
  selectWordsFeature,
  (state:WordState) => state.modalWord.indexExample!
)

export const selectExamplePrecharged = createSelector(
  selectWordsFeature,
  (state:WordState) => state.modalWord.examplePrecharged!
)

export const selectWordModalWordId = createSelector(
    selectWordsFeature,
    (state:WordState) => state.modalWord.wordPrecharged!.id!
)

export const selectWordTypeSearch = createSelector(
    selectWordsFeature,
    (state:WordState) => state.typeWordSearch
)

export const selectWordTypeSearchName = createSelector(
  selectWordsFeature,
  (state:WordState) => WORD_TYPE_SEARCH[state.typeWordSearch].label
)

export const selectWordDetail= createSelector(
  selectWordsFeature,
  (state:WordState) => state.wordDetail!
)

