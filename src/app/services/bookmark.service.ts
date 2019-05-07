import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import {Observable,BehaviorSubject } from 'rxjs';
let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    }
@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  	private API: string ='https://elearn-anhhong.c9users.io/api/';

  	constructor(private http: HttpClient) { } 

  	saveBookmark(post){
    if(httpOptions.headers.has('token')==false&&localStorage.getItem("token")!=null){
     httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
	   }
	    return this.http.post<any>(this.API+"bookmark",{post},httpOptions);
	}
  saveWordBookmark(word){
    if(httpOptions.headers.has('token')==false&&localStorage.getItem("token")!=null){
     httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
     }
      return this.http.post<any>(this.API+"bookmark",{word},httpOptions);
  }
	getBookmark(){
		if(httpOptions.headers.has('token')==false&&localStorage.getItem("token")!=null){
     httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
	   }
	   return this.http.get<any>(this.API+"bookmark",httpOptions);
	}
  removeBookmark(post){
     if(httpOptions.headers.has('token')==false&&localStorage.getItem("token")!=null){
     httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
   }
    // httpOptions.body = httpOptions.body.append()
    return this.http.request('delete',this.API+"bookmark",{body:{post},headers:httpOptions.headers});
  }
  removeWord(word){
    if(httpOptions.headers.has('token')==false&&localStorage.getItem("token")!=null){
     httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
   }
    // httpOptions.body = httpOptions.body.append()
    return this.http.request('delete',this.API+"bookmark",{body:{word},headers:httpOptions.headers});
  }
}
