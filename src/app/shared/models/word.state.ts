import { Word } from "./word.interface";

export interface WordState{
    loading:boolean,
    words:ReadonlyArray<Word>
}