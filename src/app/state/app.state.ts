import {  ActionReducerMap } from "@ngrx/store";
import { WordState } from "../shared/models/word.state";
import { wordReducer } from "./reducers/words.reducers";

export interface AppState {
    words: WordState,
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    words: wordReducer
}