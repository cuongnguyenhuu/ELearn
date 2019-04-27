import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-vocabulary',
  templateUrl: './content-vocabulary.component.html',
  styleUrls: ['./content-vocabulary.component.css']
})
export class ContentVocabularyComponent implements OnInit {

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
