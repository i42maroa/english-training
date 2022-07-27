import { createFeatureSelector } from "@ngrx/store";
import { Word } from "src/app/shared/models/word.interface";

export const selectWords = createFeatureSelector<ReadonlyArray<Word>>(`words`)