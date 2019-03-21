import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-community',
  templateUrl: './content-community.component.html',
  styleUrls: ['./content-community.component.css']
})
export class ContentCommunityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  createRange(number){
  var items: number[] = [];
  for(var i = 1; i <= number; i++){
     items.push(i);
  }
  return items;
}
}
