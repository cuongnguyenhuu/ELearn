import { Component, OnInit , Output,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
  	private routerService:Router
  	) { }

  private text_search:string;
  ngOnInit() {
  }
  navigateToSearch(){
  	if(this.text_search!=null&&this.text_search!=''){
  	this.routerService.navigate(["/search"],{queryParams:{text : this.text_search}});
  	}
  }
}
