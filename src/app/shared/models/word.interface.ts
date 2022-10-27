export interface Word{
    id?:string,
    name:string,
    translate:string,
    worldType:WordType,
    createdAt:string
}

export type WordType = 'noun' | 'verb' | 'adj' | 'phVb' | 'exp'

export const WORD_TYPE: {label:string; value:WordType}[] = [
    { label:'NOUN', value: 'noun' },
    { label:'VERB', value: 'verb' },
    { label:'ADJ', value: 'adj' },
    { label:'PHRASAL_VERB', value: 'phVb' },
    { label:'EXPRESION', value: 'exp' },
]