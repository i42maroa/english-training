import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  readonly fireBaseUrl="https://english-training-9d2bb-default-rtdb.europe-west1.firebasedatabase.app/";

  constructor(
    
    private readonly http:HttpClient,
  ) { }

   /**
   * 
   * 
   * @param path 
   * @param params 
   * @param headers 
   * @returns 
   */
    public get<T>(path: string, params?: Params, headers?:Params): Observable<T> {
      return this.http.get<T>(this.path(path), {...headers, params });
    }
  
    /**
     * Put http method with body. Returns Observable
     * 
     * @param path 
     * @param body 
     * @returns 
     */
    public put<T>(path: string, body: Record<string, any> = {}): Observable<any> {
      return this.http.post<T>(this.path(path), body);
    }
  
    /**
     * Http post method with body. returns Observable.
     * 
     * @param path 
     * @param body 
     * @returns 
     */
    public post<T>(path: string, body: Record<string, any> = {}): Observable<T> {
      return this.http.post<T>(this.path(path), body);
    }
  
    /**
     * Https delete method. Without body. Returns Observable
     * 
     * @param path 
     * @param body 
     * @returns 
     */
    public delete<T>(path: string, body: Record<string, any> = {}): Observable<T> {
      return this.http.delete<T>(this.path(path), body);
    }
  
    /**
     * Gets de path with the environment base url
     * 
     * @param path 
     * @returns 
     */
    public path(path: string): string {
      return `${this.fireBaseUrl}${path}`
    }
}
