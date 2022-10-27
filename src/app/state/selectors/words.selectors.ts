import { createFeatureSelector, createSelector } from "@ngrx/store";
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

export const selectShowModalWord = createSelector(
    selectWordsFeature,
    (state:WordState) => state.modalWord.show
)

export const selectWordModalWordId = createSelector(
    selectWordsFeature,
    (state:WordState) => state.modalWord.wordPrecharged!.id!
)

export const selectWordTypeSearch = createSelector(
    selectWordsFeature,
    (state:WordState) => state.typeWordSearch
)