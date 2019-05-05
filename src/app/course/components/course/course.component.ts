import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { CategoryService } from './../../../services/category.service'

import { Category } from './../../../models/category.class'
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

	private category:Category;
  private categories:Category[];
  private type:any[];
  private listVocab:any[];
  private listGrammar:any[];
  private listPrivate:any[];
  constructor(
  	public activeRouteService: ActivatedRoute,
  	public categoryService: CategoryService
  	) {
  	
  	 }

  
  ngOnInit() {
  	this.getAllCategories();
  	// console.log(this.category);  	
  }

  getAllCategories(){
  	let category_name;
    this.activeRouteService.paramMap.subscribe(data=>{
      if(data!=null){
        category_name = data.get('course');
        this.categoryService.getAllCategory().subscribe(data=>{
          if(data!=null){
            this.categories = data.categories;
            for (var i = 0; i < this.categories.length; ++i) {
              if(this.categories[i].name==category_name){
                this.category = this.categories[i];
              }
            }
            console.log(this.category);
            this.getType();
          }
        },error=>{
          console.log(error);
        });
      }
    });
  	
  }
  getType(){
  	if(this.category!=null){
	  	this.categoryService.getType(this.category._id).subscribe(data=>{
	  		console.log(data);
	  		if(data!=null){
	  			this.type = data.children;
	  			this.categoryService.getType(this.type[0]._id).subscribe(data=>{
	  				console.log(data);
	  				this.listVocab = data.children;
	  			},error=>{
	  				console.log(error);
	  			});
	  			this.categoryService.getType(this.type[1]._id).subscribe(data=>{
	  				this.listGrammar = data.children;
	  			},error=>{
	  				console.log(error);
	  			});
	  		}
	  	},error=>{
	  		console.log(error);
	  	});
  	}
  }

}
