import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import {Observable,BehaviorSubject } from 'rxjs';
let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    }

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private API: string ='https://elearn-anhhong.c9users.io/api/';
  constructor(private http: HttpClient) { }

  getResultSearch(text){
  	if(httpOptions.headers.has('token')==false){
    httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
   }
  	return this.http.get<any>(this.API+"search?q="+text,httpOptions);
  }
}
 