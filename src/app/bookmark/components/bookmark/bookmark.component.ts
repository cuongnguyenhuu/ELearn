import { Component, OnInit } from '@angular/core';

import { BookmarkService } from './../../../services/bookmark.service'
import { TagService } from './../../../services/tag.service'
@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  constructor(

  	private bookmarkService:BookmarkService,
    private tagService:TagService
  	) { }
  public listPost:any[];
  public listWord:any[];
  public objectTag={};
  ngOnInit() {
  	this.getBookmark();
  }

  getBookmark(){
  	this.bookmarkService.getBookmark().subscribe(data=>{
      this.listPost = data.posts;
      this.listWord = data.words;
      this.tagService.getAllTag().subscribe(data=>{
        if(data!=null){
          data.tags.forEach(tag=>{
            this.objectTag[tag._id] = tag.name;
          });
        }
      })
  		console.log(this.listPost);
  	},error=>{
  		console.log(error);
  	})
  }
  removeBookmark(post){
    this.bookmarkService.removeBookmark(post._id).subscribe(data=>{
      console.log(data);
      this.listPost.splice(this.listPost.indexOf(post),1);
    },error=>{
      console.log(error);
    })
  }
  read(word){
     window.speechSynthesis.speak(new SpeechSynthesisUtterance(word));
  }
  removeWord(word){
    this.bookmarkService.removeWord(word._id).subscribe(data=>{
      console.log(data);
      this.listWord.splice(this.listWord.indexOf(word),1);
    },error=>{
      console.log(error);
    })
  }
}
