import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import {Observable,BehaviorSubject } from 'rxjs';

let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    }
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
	private API: string ='https://elearn-anhhong.c9users.io/api/';
  	constructor(private http: HttpClient) { }

  	getAllCategory(){
  		return this.http.get<any>(this.API+"category",httpOptions);
  	}
  	getType(id_category){
  		return this.http.get<any>(this.API+"category/"+id_category+"/children",httpOptions);
  	}
    getCategoryById(id){
      return this.http.get<any>(this.API+"category?id="+id,httpOptions);
    }
}
