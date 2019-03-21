import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor() { }
  isShow: boolean = false;
  formLogin:boolean =false;
  formRegister:boolean = false;
  ngOnInit() {
  }
  toggle(){
  	this.isShow = !this.isShow;
  }

  showFormLogin(){
    this.formLogin = !this.formLogin;
  }
  showFormRegister(){
    this.formRegister = !this.formRegister;
  }
}
