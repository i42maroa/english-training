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