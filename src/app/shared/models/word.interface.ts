export interface Word{
    id?:string,
    name:string,
    translate:string,
    wordType:WordType,
    createdAt:string,
    moreInfo?:string,
    examples:ExamplePhrases[]
}

export interface ExamplePhrases {
    original:string;
    translation:string
}

export type WordType = 'noun' | 'verb' | 'adj' | 'phVb' | 'exp'

export type WordTypeSearch = 'all' | WordType

export const WORD_TYPE: {label:string; value:WordType}[] = [
    { label: 'NOUN', value: 'noun' },
    { label: 'VERB', value: 'verb' },
    { label: 'ADJ', value: 'adj' },
    { label: 'PHRASAL_VERB', value: 'phVb' },
    { label: 'EXPRESION', value: 'exp' },
]

export const WORD_TYPE_SEARCH: {label:string; value:WordTypeSearch}[] = [
    { label: 'ALL', value: 'all' },
    { label: 'NOUN', value: 'noun' },
    { label: 'VERB', value: 'verb' },
    { label: 'ADJETIVES', value: 'adj' },
    { label: 'PHRASAL VERB', value: 'phVb' },
    { label: 'EXPRESION', value: 'exp' },
]
