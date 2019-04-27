import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ELearn';
  public showMenu: boolean;
  @HostListener('window:resize', ['$event'])
	onResize(event) {
		if(window.innerWidth>768){
  		this.showMenu = true;
  	}
  	else{
  		this.showMenu = false;
  	}
	  console.log(window.innerWidth);

	  console.log(this.showMenu);
	}
  constructor(){
  	if(window.innerWidth>768){
  		this.showMenu = true;
  	}
  	else{
  		this.showMenu = false;
  	}
  }
  getValue(ev){
  	this.showMenu =!this.showMenu;
  	console.log(ev);
  }
  toggleMenu(){
  	this.showMenu=!this.showMenu;
  }
}
