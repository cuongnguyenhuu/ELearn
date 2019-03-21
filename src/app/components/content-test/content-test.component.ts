import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-test',
  templateUrl: './content-test.component.html',
  styleUrls: ['./content-test.component.css']
})
export class ContentTestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
   createRang(number){
    var items: number[] = [];
  for(var i = 1; i <= number; i++){
     items.push(i);
  }
  return items;
  }
}
