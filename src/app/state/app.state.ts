import {  ActionReducerMap } from "@ngrx/store";
import { Word } from "../shared/models/word.interface";
import { wordReducer } from "./reducers/words.reducers";

export interface AppState {
    words: ReadonlyArray<Word>
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    words: wordReducer
}