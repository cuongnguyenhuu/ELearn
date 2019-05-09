import { Component, OnInit } from '@angular/core';
import { RouterModule,Routes,ActivatedRoute } from '@angular/router';
import { PostService } from './../../../services/post.service';
import { ProfileService } from './../../../services/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Comment } from './../../../models/comment.class';
import { BookmarkService } from './../../../services/bookmark.service'
import { ClickOutside } from './../../../directive/clickOutSide.directive'
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(
  		private activatedRoute:ActivatedRoute,
  		private profileService:ProfileService,
  		private spinner:NgxSpinnerService,
  		private postService:PostService,
      private bookmarkService:BookmarkService
  	) { }
  id_post:string;
  postDetail:any;
  profile:any;
  imgCurrent:string;
  isWidthAuto:boolean;
  _comment:Comment;
  comments:Comment[];
  showDeleteComment:boolean= false;
  content_edit_comment:string;
  showEditComment:boolean=false;
  input_comment:string;
  isLiking:boolean=false;
  message:string;
  ngOnInit() {
  	this.activatedRoute.paramMap.subscribe(data=>{
  		this.id_post = data.get('id');
  		this.postService.getPostById(this.id_post).subscribe(data=>{
  			this.postDetail = data.post;
  			console.log(this.postDetail);
  			this.imgCurrent=this.postDetail.imgs[0];
  			this.postService.getComments(this.postDetail._id).subscribe(data=>{
		      // console.log(data);
		      if(data!=null){
		        this.comments = data.comments;
		        // console.log(this.comments);
		      }

		    },error=>{
		      console.log(error);
		    })
  		});
  		this.getProfileCurrentUser();
  		
  	});

  }
  getProfileCurrentUser(){
    this.profileService.profile.subscribe(data=>{
      // console.log(data);
      if(data!=null){
        this.profile = data;
      }
    })
  }
   toggleDeleteComment(){
    this.showDeleteComment = !this.showDeleteComment;
  }
  checkSizeImg(){
    // console.log(this.isWidthAuto);
    let img  = document.getElementById('img_detail');
    let black = document.getElementById('black');
    // console.log((img as HTMLImageElement).naturalWidth/(img as HTMLImageElement).naturalHeight+"/"+(black as HTMLElement).offsetWidth/(black as HTMLElement).offsetHeight);
    if((img as HTMLImageElement).naturalWidth/(img as HTMLImageElement).naturalHeight
      >(black as HTMLElement).offsetWidth/(black as HTMLElement).offsetHeight){
      this.isWidthAuto=false;
    }
    else
    this.isWidthAuto=true;
    // console.log(this.isWidthAuto);
  }
  previousImg(){
    if(this.postDetail.imgs.indexOf(this.imgCurrent)==0){
      this.imgCurrent=this.postDetail.imgs[this.postDetail.imgs.length-1];
    }
    else{
      this.imgCurrent= this.postDetail.imgs[this.postDetail.imgs.indexOf(this.imgCurrent) - 1];
    }
    this.checkSizeImg();
  }
  nextImg(){
    if(this.postDetail.imgs.indexOf(this.imgCurrent)==this.postDetail.imgs.length-1)
    {
      this.imgCurrent = this.postDetail.imgs[0];
    }
    else{
      this.imgCurrent =this.postDetail.imgs[this.postDetail.imgs.indexOf(this.imgCurrent) + 1];
    }
    this.checkSizeImg();
  }
  deleteComment(){
    this.spinner.show();
    this.postService.deleteComment(this._comment._id).subscribe(data=>{
      console.log(data);
      if(data!=null){
        this.comments.splice(this.comments.indexOf(this._comment),1);
        this.toggleDeleteComment();
        this.spinner.hide();
        this.toggleFunctionComment(null);
      }
    },error=>{
      console.log(error);
      this.toggleDeleteComment();
      this.spinner.hide();
      this.toggleFunctionComment(null);
    })
  }
   toggleFunctionComment(comment){
    
    if(this._comment == comment){
      this._comment= null;
    }
    else
      this._comment = comment;
    console.log(this._comment);
  }
  toggleEditComment(){
    this.showEditComment=!this.showEditComment;
    // this._comment=null;
    this.content_edit_comment = this._comment.content;
  }
  editComment(){
    this.spinner.show();
    console.log(this.content_edit_comment);
    this.postService.editComment(this.content_edit_comment,this._comment._id).subscribe(data=>{
      console.log(data);
      if(data!=null){
        this.comments[this.comments.indexOf(this._comment)].content=this.content_edit_comment;
        this.spinner.hide();
        this.toggleEditComment();
        this.toggleFunctionComment(null);
      }
    },error=>{
      this.spinner.hide();
      this.toggleEditComment();
      this.toggleFunctionComment(null);
      console.log(error);
    })
  }
  like(post){
    if(this.isLiking==false){
      this.isLiking=true;
      // console.log(post);
      // this.posts[this.posts.indexOf[post]].isLike=!this.posts[this.posts.indexOf[post]].isLike;
      if(post.isLike==false){
      this.postService.addLike(post._id).subscribe(data=>{
        console.log(data);
        // console.log(this.posts.indexOf(post));
        this.postDetail.likes =this.postDetail.likes +1 ;
        this.postDetail.isLike = true;
        this.isLiking=false;
      },error=>{
        console.log(error);
      })
      }
      else{
        this.postService.unLike(post._id).subscribe(data=>{
          console.log(data);
          this.postDetail.likes =this.postDetail.likes -1 ;
          this.postDetail.isLike = false;
           this.isLiking=false;
        },error=>{ 
          console.log(error);
        })
      }
    }
  }
   saveAndRemoveBookmark(post){
    if(post.isBookmark==false){
    this.bookmarkService.saveBookmark(post._id).subscribe(data=>{
      console.log(data);
      this.postDetail.isBookmark=true;
      this.message="Save bookmark success!";
        setTimeout(()=>{
          this.message = null;
        },1500);
    },error=>{
      console.log(error);
    });
    }else{
      this.bookmarkService.removeBookmark(post._id).subscribe(data=>{
        console.log(data);
        this.postDetail.isBookmark=false;
        this.message="Remove bookmark success!";
        setTimeout(()=>{
          this.message = null;
        },1500);
      },error=>{
        console.log(error);
      })
    }
  }
  addComment(){
    // console.log(this.input_comment);
    this.postService.addComment(this.input_comment,this.postDetail._id).subscribe(data=>{
      // console.log(data);
      if(data!=null){
      this.comments.unshift(new Comment(data.comment,this.profile,this.postDetail._id,this.input_comment,new Date()));
      // console.log(this.comments);
      // this.posts[this.posts.indexOf(this.postDetail)].comments = this.posts[this.posts.indexOf(this.postDetail)].comments +1;
      // this.postDetail.comments= this.postDetail.comments+1;
      this.input_comment='';
      }
    },error=>{
      console.log(error);
    });
  }
}
