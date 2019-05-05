import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import {Observable,BehaviorSubject } from 'rxjs';

let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    }
@Injectable({
  providedIn: 'root'
})
export class TagService {

  private API: string ='https://elearn-anhhong.c9users.io/api/';
  constructor(private http: HttpClient) { }

  getAllTag(){
  	return this.http.get<any>(this.API+"tag",httpOptions);
  }

}
