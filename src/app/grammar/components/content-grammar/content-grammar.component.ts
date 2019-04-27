import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-grammar',
  templateUrl: './content-grammar.component.html',
  styleUrls: ['./content-grammar.component.css']
})
export class ContentGrammarComponent implements OnInit {

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
