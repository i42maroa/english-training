import { Injectable } from '@angular/core';
import algoliasearch from 'algoliasearch';

const APPLICATION_ID = 'E3L86S647V';
const SEARCH_API_KEY = '38a304b1eaa6c82008f49d20fa81ad9c';
const ALGOLIA_INDEX = 'english_training';

const searchClient = algoliasearch(
  APPLICATION_ID,
  SEARCH_API_KEY
);

const index = searchClient.initIndex(ALGOLIA_INDEX);

@Injectable({
  providedIn: 'root'
})
export class AlgoliaService {

  constructor() { }

  search(textToSearch: string): Promise<any>{
    return index.search(textToSearch);
  }
}
