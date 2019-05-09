import { Component, OnInit } from '@angular/core';

 let left =0;

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.css']
})
export class IntroduceComponent implements OnInit {
	public number_slide = '1';
  animation:any;

  constructor() {
  	// this.changeNumber();
   }

  ngOnInit() {
    left = 0;
    this.animation = setInterval(this.changeLeft,5000);
  }

  changeNumber(){
  	// while(true){
  	setTimeout(function(){
  		this.number_slide = parseInt(this.number_slider)+1;
  	},3000);
  // }
  }
  changeLeft(){
    console.log("//////");
      if(left==-4){
        left=0;
      }
      else
      left-=1;
      console.log(left);
      (document.getElementsByName("slide")[-left] as HTMLInputElement).checked = true;
      document.getElementById("content").style.left = left*100+"%";
  }
  OnChangeLeft(number){
    left=-number;
    document.getElementById("content").style.left = left*100+"%";
    clearInterval(this.animation);
    this.animation = setInterval(this.changeLeft,5000);
  }
  ngOnDestroy(){
    clearInterval(this.animation);
  }
}
