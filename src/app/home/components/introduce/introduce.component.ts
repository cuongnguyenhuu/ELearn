import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.css']
})
export class IntroduceComponent implements OnInit {
	public number_slide = '1';
  constructor() {
  	// this.changeNumber();
   }

  ngOnInit() {
  }

  changeNumber(){
  	// while(true){
  	setTimeout(function(){
  		this.number_slide = parseInt(this.number_slider)+1;
  	},3000);
  // }
  }

}
