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
export class ProfileService {

	private API: string ='https://elearn-anhhong.c9users.io/api/';

  private profileStore = new BehaviorSubject(null);
  profile = this.profileStore.asObservable();

  constructor(
	private http: HttpClient
  	) { }
  getProfile(){
    if(httpOptions.headers.has('token')==false){
    httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
   }
    this.http.get<any>(this.API+'profile',httpOptions).subscribe(data=>{
       this.profileStore.next(data.profile);
       // console.log(data.profile);
    }, error=>{
      console.log(error);
    })
  }
  update(data){
    this.profileStore.next(data);
  }
  // getProfile():Observable<any>{
  //   if(httpOptions.headers.has('token')==false){
  //   httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
  //  }
  // 	return this.http.get(this.API+'profile',httpOptions)
  // }
  updateProfile(name:string,gender:boolean,birthday:number,email:string,address:string,phone:string,img:string):Observable<any>{
    return this.http.put(this.API+'profile',{name,gender,birthday,email,address,phone,img},httpOptions);
  }
  uploadImg(photo:File):Observable<any>{
    const formData = new FormData();
    formData.append('photo', photo, photo.name);
    return this.http.post(this.API+'upload',formData);
  }
  changePassword(oldPass,newPass,confirmPass){
    return this.http.post(this.API+"reset",{oldPass,newPass,confirmPass},httpOptions);
  }
}
