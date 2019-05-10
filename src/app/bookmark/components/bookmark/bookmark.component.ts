import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private tagService:TagService,
    private routeServie: Router
  	) { }
  public listPost:any[];
  public listWord:any[];
  public objectTag={};
  isReading:boolean = false;
  isRemoving:boolean = false;
  ngOnInit() {
    if(localStorage.getItem('token')==null){
      this.routeServie.navigateByUrl("/");
    }
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
    if(this.isRemoving==false){
      this.isRemoving = true;
    this.bookmarkService.removeBookmark(post._id).subscribe(data=>{
      console.log(data);
      this.listPost.splice(this.listPost.indexOf(post),1);
      this.isRemoving=false;
    },error=>{
      console.log(error);
      this.isRemoving=false;
    })
    }
  }
  read(word){
        if(this.isReading==false){
    // window.speechSynthesis.cancel();
    this.isReading=true;
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(word));
    setTimeout(()=>{
      this.isReading=false;
    },1000)
    }
  }
  removeWord(word){
    if(this.isRemoving==false){
      this.isRemoving = true;
    this.bookmarkService.removeWord(word._id).subscribe(data=>{
      console.log(data);
      this.listWord.splice(this.listWord.indexOf(word),1);
      this.isRemoving=false;
    },error=>{
      console.log(error);
      this.isRemoving=false;
    })
  }
  }
}
