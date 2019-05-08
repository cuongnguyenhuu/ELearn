import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { CategoryService } from './../../../services/category.service'
import { TestService } from './../../../services/test.service'
import { Category } from './../../../models/category.class'

let count;
@Component({
  selector: 'app-content-test',
  templateUrl: './content-test.component.html',
  styleUrls: ['./content-test.component.css']
})
export class ContentTestComponent implements OnInit {

  public category:Category;
  private categories:Category[];
  private type:any[];
  public listVocab:any[];
  public listGrammar:any[];
  private listPrivate:any[];
  url:string;
  category_name:string;
  categories_selected:string[] = [];
  showDialog=true;
  list_question:any[];
  public timeleft:string='';
  query:string='';
  list_answers:any[20]=[];
  list_selected:any[]=[];
  matches:any;
  total_question_correct:any;
  // count:any;
  constructor(
    public activeRouteService: ActivatedRoute,
    public categoryService: CategoryService,
    private testService:TestService
    ) { }
  @HostListener('click', ['$event'])
  onclick(event: any) {    
    // Logs the id of the element 
    // where the event is originally invoked.     
     let id_question = event.target.id.slice(0,event.target.id.length-1);
     if(this.list_selected.indexOf(id_question)==-1){
       this.list_selected.push(id_question);
     }
  }
  moveTo(id_question){
    var question = document.getElementById("question"+id_question);
    question.scrollIntoView();
  }
  ngOnInit() {
   
    // document.getElementById("timeleft").innerText='';
      this.activeRouteService.queryParamMap.subscribe(data=>{
              this.query = data.get('type');
               clearInterval(count);
               this.list_selected=[];
            this.timeleft='';
            this.total_question_correct=null;
            this.list_question=null;
          if(this.query!="choose"){
            this.showDialog=false;
             this.categories_selected.push(this.query);
             this.createTest();
             // console.log(this.categories_selected);
          }    
      });
     this.url = window.location.pathname;
    this.getAllCategories();
    
  }
  submitTest(){
    let j=0;
    this.list_question.forEach(question=>{
      let i=0;
      this.list_answers[j]='';
      question.answers.forEach(answer=>{
          var input = document.getElementById(question._id+i) as HTMLInputElement
        if(input.checked){
          this.list_answers[j]=answer;
        }
        i++;
      });
      j++;
    })
    this.testService.checkAnswer(this.matches,this.list_answers).subscribe(data=>{
      console.log(data);
      this.list_question=[];
      this.total_question_correct = data.match;
      clearInterval(count);
    })
    // this.list_question
    console.log(this.list_answers);
  }
  countDown(duration){ 
    var timer:number = duration, minutes=null, seconds=null;
    count = setInterval(()=> {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        this.timeleft = minutes + ":" + seconds;
        // console.log(this.timeleft);
        document.getElementById("timeleft").innerText=this.timeleft;
        if (--timer < 0) {
            clearInterval(count);
            // this.stopCount();

            this.submitTest();
        }
    }, 1000);
  }
  // stopCount(){
  //   clearInterval(this.count);
  // }
    createTest(){
    console.log(this.categories_selected);
    if(this.categories_selected.length>0){
    this.testService.getAllTest(this.categories_selected,20).subscribe(data=>{
      console.log(data);
      this.list_question = data.questions;
      this.matches = data.matches;
      this.showDialog=false;
      if(this.list_question.length>0){
        this.countDown(60*30);
      }
    });
    }
  }
    toggleDialogTest(){
    if(this.showDialog==false){
      this.categories_selected=[];
      this.list_question=null;
      clearInterval(count);
    }
    this.showDialog=!this.showDialog;
    console.log(this.showDialog);
  }
  option(id){
    if(this.categories_selected.indexOf(id)==-1){
      this.categories_selected.push(id);
    }
    else{
      this.categories_selected.splice(this.categories_selected.indexOf(id),1);
    }
  }
  getAllCategories(){
    
    this.activeRouteService.paramMap.subscribe(data=>{
      if(data!=null){
        this.category_name = data.get('course');
        this.categoryService.getAllCategory().subscribe(data=>{
          if(data!=null){
            this.categories = data.categories;
            for (var i = 0; i < this.categories.length; ++i) {
              if(this.categories[i].name==this.category_name){
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
          this.categoryService.getType(this.type[1]._id).subscribe(data=>{
            console.log(data);
            this.listVocab = data.children.reverse();

          },error=>{
            console.log(error);
          });
          this.categoryService.getType(this.type[0]._id).subscribe(data=>{
            this.listGrammar = data.children.reverse();
          },error=>{
            console.log(error);
          });
        }
      },error=>{
        console.log(error);
      });
    }
  }
   createRang(number){
    var items: number[] = [];
  for(var i = 1; i <= number; i++){
     items.push(i);
  }
  return items;
  }
}
