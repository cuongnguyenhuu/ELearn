import { Component, OnInit } from '@angular/core';
import { RouterModule,Routes,ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../services/category.service'
import { WordService } from './../../../services/word.service'
import { BookmarkService } from './../../../services/bookmark.service'
@Component({
  selector: 'app-content-vocabulary',
  templateUrl: './content-vocabulary.component.html',
  styleUrls: ['./content-vocabulary.component.css']
})
export class ContentVocabularyComponent implements OnInit {

  constructor(
    private activatedService:ActivatedRoute,
    private categorySerivice:CategoryService,
    private wordService:WordService,
    private bookmarkService:BookmarkService
    ) { }
  id_category:string;
  name_category:string;
  listWord:any[];
  id_category_parent:string;
  child_category:any[];
  url:string;
  isLogin:string;
  temp:any[]; 
  course:string;
  urlTest:string;
  isReading:boolean = false;
  message:string;
  ngOnInit() {
   
    this.activatedService.paramMap.subscribe(data=>{
      console.log(data.get('id'));
      this.isLogin = localStorage.getItem('token');
      this.url = window.location.pathname.slice(0,window.location.pathname.lastIndexOf('/')+1);
      this.listWord=null;
      if(data!=null){
        this.id_category=data.get('id');
        this.course = data.get('course');
        this.urlTest = '/level/'+this.course+'/test?type='+this.id_category;
        console.log(data);
        this.categorySerivice.getCategoryById(this.id_category).subscribe(data=>{
          this.name_category = data.category.name;
          this.id_category_parent = data.category.parent;
          this.categorySerivice.getType(this.id_category_parent).subscribe(data=>{
          console.log(data);
            this.child_category = data.children;
          });
        });
        this.wordService.getAllWord(this.id_category).subscribe(data=>{
          this.listWord = data.words;
          console.log(data)
          console.log(this.listWord);
        });
        
      }
    })
  }
  tempArray(number){
    this.temp=[];
    for (var i = 0; i < number; ++i) {
      this.temp[i]=i;
    }
    return this.temp;
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
  addAndRemoveBookmark(word){
    if(word.isBookmark){
      this.bookmarkService.saveWordBookmark(word._id).subscribe(data=>{
        console.log(data);
        this.listWord[this.listWord.indexOf(word)].isBookmark=false;
        this.message="Remove bookmark success!";
        setTimeout(()=>{
          this.message = null;
        },1500);
      })

    }
    else{
    this.bookmarkService.saveWordBookmark(word._id).subscribe(data=>{
      console.log(data);
      this.listWord[this.listWord.indexOf(word)].isBookmark=true;
      this.message="Save bookmark success!";
        setTimeout(()=>{
          this.message = null;
        },1500);
    });
    }
  }
}
