import { Component, OnInit } from '@angular/core';
import { RouterModule,Routes,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.css']
})
export class ResultSearchComponent implements OnInit {

  constructor(
  	private activatedRouteService:ActivatedRoute
  	) { }
  private text_search:string;
  ngOnInit() {
  	this.activatedRouteService.queryParams.subscribe(data=>{
  		// console.log(data);
  		this.text_search = data.text;
  		console.log(this.text_search);
  	})
  }

}
