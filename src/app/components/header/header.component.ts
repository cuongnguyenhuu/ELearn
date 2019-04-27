import { Component, OnInit , Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	@Output() value_click = new EventEmitter();
	showMenu:boolean = false;
  constructor() { }

  ngOnInit() {
  }
  toggleMenu(){
  	this.showMenu = !this.showMenu;
  	this.value_click.emit(this.showMenu);
  }

}
