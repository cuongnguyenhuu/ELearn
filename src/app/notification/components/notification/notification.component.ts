import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
	@Input() value :string;
	// isShow:boolean;
  constructor() { }

  ngOnInit() {
  	// if(this.value==)
  	
  	
  }
  ngAfterViewInit(){
  	let widthNotify = (document.getElementById('toad') as HTMLElement).offsetWidth;
  	let left = (screen.width-widthNotify) / 2;
  	(document.getElementById('toad') as HTMLElement).style.left = left+"px";
  	console.log(left);
  	// console.log((document.getElementById('toad') as HTMLElement).offsetWidth);
  }

}
