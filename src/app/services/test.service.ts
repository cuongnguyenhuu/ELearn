import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import {Observable,BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    }
@Injectable({
  providedIn: 'root'
})
export class TestService {
	private API: string ='https://elearn-anhhong.c9users.io/api/';
  constructor(
  	private http: HttpClient
  	) { }

  getAllTest(categories:string[],size){
    if(httpOptions.headers.has('token')==false&&localStorage.getItem('token')!=null){
    httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
   }
   console.log("get all test");
   if(categories.length>1){
     return this.http.request<any>('get',this.API+"quiz",{headers:httpOptions.headers,params:{size,categories}});
   }
   else{
     return this.http.get<any>(this.API+"quiz?categories[0]="+categories[0]+"&size="+size,httpOptions);
   }
	}
  checkAnswer(matches:any,answers:any[]){
    if(httpOptions.headers.has('token')==false&&localStorage.getItem('token')!=null){
    httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
   }
     return this.http.post<any>(this.API+"quiz",{matches,answers},httpOptions);
  }
}
 