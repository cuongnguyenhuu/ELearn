import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import {Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Router} from '@angular/router';

import { LoginResponse } from'./../models/loginResponse.class'
let httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	private API: string ='https://elearn-anhhong.c9users.io/api/'
  constructor(
  	private http: HttpClient,
    private router: Router
  	) { }

  checkLogin(username:string,password:string) : Observable<LoginResponse> {
  	return this.http.post<LoginResponse>(this.API+'login',{username,password},httpOptions);
  }

  getProfile(){
  	httpOptions.headers =  httpOptions.headers.append("token",localStorage.getItem('token'));
  	// console.log(httpOptions.headers);
  	return this.http.get(this.API+'profile',httpOptions)
  }
  logout(){
    localStorage.clear();
    httpOptions.headers =  httpOptions.headers.delete("token");
    window.location.href="/";
  }
  register(username:string, password:string, name:string, email:string) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.API+"profile",{username,password,name,email},httpOptions);
  }
}
