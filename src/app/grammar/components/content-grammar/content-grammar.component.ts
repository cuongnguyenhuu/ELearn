import { Component, OnInit } from '@angular/core';
import { RouterModule,Routes,ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../services/category.service'
import { GrammarService } from './../../../services/grammar.service'
import { BookmarkService } from './../../../services/bookmark.service'

@Component({
  selector: 'app-content-grammar',
  templateUrl: './content-grammar.component.html',
  styleUrls: ['./content-grammar.component.css']
})
export class ContentGrammarComponent implements OnInit {

  constructor(
    private activatedService:ActivatedRoute,
    private categorySerivice:CategoryService,
    private grammarService:GrammarService,
    private bookmarkService:BookmarkService
    ) { }

  id_category:string;
  name_category:string;
  listGrammar:any[];
  id_category_parent:string;
  child_category:any[];
  url:string;
  temp:any[];
  course:string;
  urlTest:string;
  ngOnInit() {
    this.url = window.location.pathname.slice(0,window.location.pathname.lastIndexOf('/')+1);
    this.activatedService.paramMap.subscribe(data=>{
      console.log(data.get('id'));
      this.listGrammar=null;
      if(data!=null){
        this.id_category=data.get('id');
        this.course = data.get('course');
        this.urlTest = '/level/'+this.course+'/test?type='+this.id_category;

        this.categorySerivice.getCategoryById(this.id_category).subscribe(data=>{
          this.name_category = data.category.name;
          this.id_category_parent = data.category.parent;
          this.categorySerivice.getType(this.id_category_parent).subscribe(data=>{
          console.log(data);
            this.child_category = data.children.reverse();
          });
        });
        this.grammarService.getAllGrammar(this.id_category).subscribe(data=>{
          this.listGrammar = data.grammars.reverse();
          console.log(data)
          console.log(this.listGrammar);
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
  // read(word){
  //   window.speechSynthesis.speak(new SpeechSynthesisUtterance(word));
  // }
  // addAndRemoveBookmark(word){
  //   if(word.isBookmark){
  //     this.bookmarkService.saveWordBookmark(word._id).subscribe(data=>{
  //       console.log(data);
  //       this.listWord[this.listWord.indexOf(word)].isBookmark=false;
  //     })

  //   }
  //   else{
  //   this.bookmarkService.saveWordBookmark(word._id).subscribe(data=>{
  //     console.log(data);
  //     this.listWord[this.listWord.indexOf(word)].isBookmark=true;
  //   });
  //   }
  // }
}

 