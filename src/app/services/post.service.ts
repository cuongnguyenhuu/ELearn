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

  getAllPost(pageNumber,tag_id){
  	if(httpOptions.headers.has('token')==false&&localStorage.getItem("token")!=null){
     httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
   }
   if(tag_id==null){
     // console.log("tag: null");
     return this.http.get<any>(this.API+"post/?limit=10&page="+pageNumber,httpOptions);
   }
   else{
     console.log(pageNumber);
     return this.http.get<any>(this.API+"post?tag="+tag_id+"&limit=10&page="+pageNumber,httpOptions);
   }
   
  }
  addPost(content,imgs:string[],tags:any[]){
    if(httpOptions.headers.has('token')==false&&localStorage.getItem("token")!=null){
     httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
   }
  	return this.http.post<any>(this.API+"post",{content,imgs,tags},httpOptions);
  }
  editPost(content,id){
    if(httpOptions.headers.has('token')==false&&localStorage.getItem("token")!=null){
     httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
   }
    return this.http.put<any>(this.API+"post",{content,id},httpOptions);
  }
  deletePost(id){
    if(httpOptions.headers.has('token')==false&&localStorage.getItem("token")!=null){
     httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
   }
    // httpOptions.body = httpOptions.body.append()
    return this.http.request('delete',this.API+"post",{body:{id},headers:httpOptions.headers});
  }
  getComments(id){
    if(httpOptions.headers.has('token')==false&&localStorage.getItem("token")!=null){
     httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
   }
    return this.http.get<any>(this.API+"post/"+id+"/comments",httpOptions);
  }
  addComment(content,post){
    if(httpOptions.headers.has('token')==false&&localStorage.getItem("token")!=null){
     httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
   }
    return this.http.post<any>(this.API+"comment",{content,post},httpOptions);
  }
  editComment(content,id){
    if(httpOptions.headers.has('token')==false&&localStorage.getItem("token")!=null){
     httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
   }
    return this.http.put<any>(this.API+"comment",{content,id},httpOptions);
  }
  deleteComment(id){
    if(httpOptions.headers.has('token')==false&&localStorage.getItem("token")!=null){
     httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
   }
    // httpOptions.body = httpOptions.body.append()
    return this.http.request('delete',this.API+"comment",{body:{id},headers:httpOptions.headers});
  }
  addLike(post){
     if(httpOptions.headers.has('token')==false&&localStorage.getItem("token")!=null){
     httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
   }
    return this.http.post<any>(this.API+"like",{post},httpOptions);
  }
  unLike(post){
     if(httpOptions.headers.has('token')==false&&localStorage.getItem("token")!=null){
     httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
   }
     return this.http.request('delete',this.API+"like",{body:{post},headers:httpOptions.headers});
  }
}