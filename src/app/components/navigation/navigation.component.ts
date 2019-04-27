import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { LoginService } from'./../../services/login.service'
import { ProfileService } from './../../services/profile.service'
import { NgxSpinnerService } from 'ngx-spinner';

import { LoginResponse } from'./../../models/loginResponse.class'
import { Profile } from './../../models/profile.class'
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Output() value_click = new EventEmitter();
  constructor(
    public loginService : LoginService,
    private profileService: ProfileService,
    private spinner: NgxSpinnerService
    ) {  }

  profile :Profile = new Profile();
  name:string;
  imgId:string;

  isLogin: boolean;
  message_error: string='';

  isShowDetailNotify: boolean = false;
  formLogin:boolean =false;
  formRegister:boolean = false;
  username_login:string;
  password_login:string;
  loginResponse: LoginResponse;
  // profile : any;

  username_reg:string='';
  password_reg:string='';
  rePassword_red:string='';
  fullName:string='';
  email:string='';
  showSubMenu:boolean=false;
  showMenu:boolean = false;
  ngOnInit() {
    if (localStorage.getItem("token")!=null) {
      this.isLogin = true;
      this.getProfile();
    }
    else
      this.isLogin =false;
     if(window.innerWidth>=768){
       this.showMenu=true;
     }
  }
  test(){
    this.showMenu=!this.showMenu;
  }
  toggleSubMenu(){
    this.showSubMenu=!this.showSubMenu;
  }
  toggleMenu(){
    if(window.innerWidth<=768){
    this.value_click.emit("clicked");
    }
  }
  getProfile(){
    this.profileService.getProfile();
    this.profileService.profile.subscribe(data=>{
      this.profile = data;
      if(this.profile!=null){
        this.name=this.profile.name;
        this.imgId = this.profile.img;
        console.log(this.profile);
      }
      // console.log(this.profile.name);
    },error=>{
      console.log(error);
    })
  }
  // getProfile(){
  //   this.profileService.getProfile().subscribe(data =>{
  //       // console.log(data);
  //       this.profile = data;
  //       this.name = this.profile.profile.name;
  //       this.imgId = this.profile.profile.img;
  //       console.log(this.profile.name);
  //     }, error =>{
  //       console.log(error);
  //     })
  // }

  toggle(){
  	this.isShowDetailNotify = !this.isShowDetailNotify;
  }

  showFormLogin(){
    // this.value.emit("clicked");
    this.formLogin = !this.formLogin;
    this.message_error='';
    if(window.innerWidth<=768){
      this.showMenu =!this.showMenu;
    }
  }
  showFormRegister(){
    // this.value.emit("clicked");
    this.formRegister = !this.formRegister;
    this.message_error='';
    if(window.innerWidth<=768){
      this.showMenu =!this.showMenu;
    }
  }
  login(){
    console.log(this.username_login+"/"+ this.password_login);
    if(this.username_login!=''&&this.password_login!=''){
      this.message_error='';
      this.spinner.show();
      this.loginService.checkLogin(this.username_login,this.password_login).subscribe(data =>{
      console.log(data);
      this.loginResponse = data;
      console.log("token: "+this.loginResponse.token);
      if(this.loginResponse.token!=null){
        localStorage.setItem("token",this.loginResponse.token);
        localStorage.setItem("id",this.loginResponse.id);
        this.getProfile();
        this.showFormLogin();
        this.isLogin = !this.isLogin;
      }
      else{
        this.message_error="Username or password incorrect! Please type again."
      }
      this.spinner.hide();
    }, error =>{
      console.log(error);
      this.spinner.hide();
      this.message_error="Server error!"
    });
    }
    else{
      this.message_error="Username or password not blank."
    }
  }

  register(){
    console.log(this.username_reg+"/"+this.password_reg+"/"+this.rePassword_red+"/"+this.fullName+"/"+this.email);
    if(this.username_reg!=''&&this.password_reg!=''&&this.rePassword_red!=''&&this.fullName!=''&&this.email!=''){
      if(this.password_reg==this.rePassword_red){
        this.spinner.show();
        this.message_error='';
        this.loginService.register(this.username_reg,this.password_reg,this.fullName,this.email).subscribe(data=>{
          console.log(data);
          this.loginResponse = data;

          if(this.loginResponse.token!=null){
            localStorage.setItem("token",this.loginResponse.token);
            localStorage.setItem("id",this.loginResponse.id);
            this.getProfile();
            this.showFormRegister();
            this.isLogin = !this.isLogin;
          }
          else{
            this.message_error="Username aready exist!."
          }

          this.spinner.hide();
        })
      }
      else{
        this.message_error = "Re-password incorrect!"
      }
    }else
    {
      this.message_error = "Please fill in all fields!"
    }
  }
}
