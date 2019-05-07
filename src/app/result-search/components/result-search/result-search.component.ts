import { Component, OnInit } from '@angular/core';
import { RouterModule,Routes,ActivatedRoute } from '@angular/router';
import { SearchService } from './../../../services/search.service'
import { TagService } from './../../../services/tag.service'
import { BookmarkService } from './../../../services/bookmark.service'
@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.css']
})
export class ResultSearchComponent implements OnInit {

  constructor(
  	private activatedRouteService:ActivatedRoute,
    private searchService:SearchService,
    private tagService:TagService,
    private bookmarkService:BookmarkService
  	) { }
  public text_search:string;
  listPost:any[];
  listWord:any[];
  public objectTag={};
  ngOnInit() {
  	this.activatedRouteService.queryParams.subscribe(data=>{
  		// console.log(data);
      this.listPost=null;
      this.listWord =null;
      if(data!=null){
    		this.text_search = data.text;
    		this.searchService.getResultSearch(this.text_search).subscribe(data=>{
          this.listPost = data.posts;
          this.listWord = data.words;
          this.tagService.getAllTag().subscribe(data=>{
          if(data!=null){
            data.tags.forEach(tag=>{
              this.objectTag[tag._id] = tag.name;
            });
          }
      })
        },error=>{
          console.log(error);
        })
      }
  	})
  }
  read(word){
     window.speechSynthesis.speak(new SpeechSynthesisUtterance(word));
  }
  addAndRemoveBookmark(word){
    if(word.isBookmark){
      this.bookmarkService.saveWordBookmark(word._id).subscribe(data=>{
        console.log(data);
        this.listWord[this.listWord.indexOf(word)].isBookmark=false;
      })

    }
    else{
    this.bookmarkService.saveWordBookmark(word._id).subscribe(data=>{
      console.log(data);
      this.listWord[this.listWord.indexOf(word)].isBookmark=true;
    });
    }
  }
}
