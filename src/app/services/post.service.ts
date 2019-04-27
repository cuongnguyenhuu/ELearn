import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import {Observable,BehaviorSubject } from 'rxjs';

let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    }
@Injectable({
  providedIn: 'root'
})

export class PostService {
	private API: string ='https://elearn-anhhong.c9users.io/api/';

  constructor(private http: HttpClient) { } 

  getAllPost(){
  	if(httpOptions.headers.has('token')==false){
     httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
   }
   return this.http.get<any>(this.API+"post",httpOptions);
  }
  addPost(content,imgs:string[]){
  	return this.http.post<any>(this.API+"post",{content,imgs},httpOptions);
  }
  editPost(content,id){
    return this.http.put<any>(this.API+"post",{content,id},httpOptions);
  }
  deletePost(id){
    // httpOptions.body = httpOptions.body.append()
    return this.http.request('delete',this.API+"post",{body:{id},headers:httpOptions.headers});
  }
  getComments(id){
    return this.http.get<any>(this.API+"post/"+id+"/comments",httpOptions);
  }
  addComment(content,post){
    return this.http.post<any>(this.API+"comment",{content,post},httpOptions);
  }
  editComment(content,id){
    return this.http.put<any>(this.API+"comment",{content,id},httpOptions);
  }
  deleteComment(id){
    // httpOptions.body = httpOptions.body.append()
    return this.http.request('delete',this.API+"comment",{body:{id},headers:httpOptions.headers});
  }
}