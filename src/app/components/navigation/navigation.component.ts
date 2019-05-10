import { Component, OnInit, Output,EventEmitter,HostListener } from '@angular/core';
import { LoginService } from'./../../services/login.service'
import { ProfileService } from './../../services/profile.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from './../../services/category.service'

import { LoginResponse } from'./../../models/loginResponse.class'
import { Profile } from './../../models/profile.class'
import { Category } from './../../models/category.class'
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(window.innerWidth>=767.98){
      this.showMenu = true;
    }
    else{
      this.showMenu = false;
    }
    console.log(window.innerWidth);

    console.log(this.showMenu);
  }
  constructor(
    public loginService : LoginService,
    private profileService: ProfileService,
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService
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
  showMenu:boolean =true;
  categories:Category[];
  message:string;
  ngOnInit() {
    if (localStorage.getItem("token")!=null) {
      this.isLogin = true;
      this.getProfile();
    }
    else
      this.isLogin =false;
     if(window.innerWidth>=767.98){
       this.showMenu=true;
     }
     else{
       this.showMenu=false;
     }
     this.getCategory();
     console.log(this.showMenu);
  }
  getCategory(){
    this.categoryService.getAllCategory().subscribe(data=>{
        this.categories = data.categories;
        console.log(this.categories);

    },error=>{
      console.log(error);
    })
  }
  test(){
    this.showMenu=!this.showMenu;
  }
  toggleSubMenu(){
    this.showSubMenu=!this.showSubMenu;
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
  toggleMenu(){
    if(window.innerWidth<=767){
      this.showMenu =!this.showMenu;
    }
    this.showSubMenu=false;
  }
  showFormLogin(){
    // this.value.emit("clicked");
    this.formLogin = !this.formLogin;
    this.message_error='';
    if(window.innerWidth<=767){
      this.showMenu =!this.showMenu;
    }
  }
  showFormRegister(){
    // this.value.emit("clicked");
    this.formRegister = !this.formRegister;
    this.message_error='';
    if(window.innerWidth<=767){
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

        window.location.reload();
        this.message="You logged";
        setTimeout(()=>{
          this.message = null;
        },2000);
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

        if(this.checkName(this.fullName)){
          if(this.checkMail(this.email)){
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
            window.location.reload();
            this.message="You have logged in!";
            setTimeout(()=>{
              this.message = null;
            },2000);
          }
          else{
            this.message_error="Username aready exist!."
          }

          this.spinner.hide();
        })
      }else{
        this.message_error = "Your email is invalid !"
      }

      }else{
         this.message_error = "Your name is invalid !"
      }

      }
      else{
        this.message_error = "Re-password incorrect !"
      }
    }else
    {
      this.message_error = "Please fill in all fields !"
    }
  }
  checkName(name:string):boolean{
   var re = /^[a-z\u00A1-\uFFFF\s]*$/m;
   return re.test(name.toLowerCase());
  }
  checkMail(mail:String):boolean{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail.toLowerCase());
   }
}
