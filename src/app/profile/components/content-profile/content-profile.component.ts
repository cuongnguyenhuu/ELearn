import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../../../services/profile.service'
import { LoginService } from './../../../services/login.service'
import { NgxSpinnerService } from 'ngx-spinner';
//models
import { Profile } from './../../../models/profile.class'
@Component({
  selector: 'app-content-profile',
  templateUrl: './content-profile.component.html',
  styleUrls: ['./content-profile.component.css']
})
export class ContentProfileComponent implements OnInit {

  constructor(
  	public profileService: ProfileService,
  	private loginService: LoginService,
    private spinner : NgxSpinnerService
  	) { }
  password_old:string;
  password_new:string
  rePassword:string;
  dialog_edit:boolean =false;
  value_dialog:string;
  name:string;
  profile_data : any;
  profile : Profile = new Profile();
  filetoUpload: File = null;
  imgId:string;
  ngOnInit() {
  	this.getProfile();
  }
  getProfile(){
    this.profileService.getProfile();
    this.profileService.profile.subscribe(data=>{
      if(data!=null)
      this.profile = data;
    })
  }
  // getProfile(){
  //   this.profileService.getProfile().subscribe(data =>{
  //     this.profile_data = data;
  //     console.log(data);
  //     this.profile.id = this.profile_data.profile.id;
  //     this.profile.username = this.profile_data.profile.username;
  //     this.profile.name = this.profile_data.profile.name;
  //     this.profile.gender = this.profile_data.profile.gender;
  //     this.profile.age = this.profile_data.profile.age;
  //     this.profile.email = this.profile_data.profile.email;
  //     this.profile.address = this.profile_data.profile.address;
  //     this.profile.phone = this.profile_data.profile.phone;
  //     this.profile.img = this.profile_data.profile.img;
  //   }, error =>{
  //     console.log(error)
  //   })
  // }
  changePassword(){
    this.password_new = this.value_dialog;
    this.spinner.show();
    this.toggle_dialog(name);
    console.log(this.password_old+"/"+this.password_new+"/"+this.rePassword);
    this.profileService.changePassword(this.password_old,this.password_new,this.rePassword).subscribe(data=>{
      console.log(data);
      this.spinner.hide();
    },error=>{
      console.log(error);
      this.spinner.hide();
    })
  }
  logout(){
  	this.loginService.logout();
  }
  toggle_dialog(name:string){
    this.name = name;
    this.dialog_edit = !this.dialog_edit;
    switch (name) {
      case "name":
        this.value_dialog=this.profile.name;
        break;
      case "birthday":
        this.value_dialog=this.profile.birthday.toString();
        break;
      case "address":
        this.value_dialog=this.profile.address;
        break;
      case "email":
        this.value_dialog=this.profile.email;
        break;
      case "gender":
        this.value_dialog=this.profile.gender==true?'true':'false';
        break;
      case "phone number":
        this.value_dialog=this.profile.phone;
        break;
      case "password":
        this.value_dialog=this.password_new;
        break;
      default:
        // code...
        break;
    }
  }
  update(){
    // this.toggle_dialog(name);
    this.spinner.show();
    switch (this.name) {
      case "name":
        this.profile.name = this.value_dialog;
        break;
      case "birthday":
        this.profile.birthday = Number.parseInt(this.value_dialog);
        break;
      case "address":
        this.profile.address = this.value_dialog;
        break;
      case "email":
        this.profile.email = this.value_dialog;
        break;
      case "gender":
        this.profile.gender = this.value_dialog=='true'?true:false;
        break;
      case "phone number":
        this.profile.phone = this.value_dialog;
        break;
      default:
        // code...
        break;
    }
    this.toggle_dialog(name);
    this.updateProfile();
    console.log(this.value_dialog);
  }
  updateProfile(){
    this.profileService.updateProfile(this.profile.name,this.profile.gender,this.profile.birthday,this.profile.email,this.profile.address,this.profile.phone,this.profile.img).subscribe(data=>{
      console.log(data);
      this.profileService.getProfile();
      console.log("////"+this.profile);
      this.spinner.hide();
      // window.location.href="/profile";
    },error=>{
      console.log(error);
    })
  }
  uploadImg(event){
    this.spinner.show();
    this.filetoUpload = event.target.files[0];
    console.log(this.filetoUpload);
    this.profileService.uploadImg(this.filetoUpload).subscribe(data=>{
      console.log(data.imgId);

      this.profile.img = data.imgId;
      this.updateProfile();

    },error=>{
      console.log(error);
    });
  }
}
