import { Component, OnInit,HostListener  } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
//service
import { PostService } from './../../../services/post.service'
import { ProfileService } from './../../../services/profile.service'
//models
import { Post } from './../../../models/post.class';
import { Comment } from './../../../models/comment.class';
@Component({
  selector: 'app-content-community',
  templateUrl: './content-community.component.html',
  styleUrls: ['./content-community.component.css']
})
export class ContentCommunityComponent implements OnInit {
  showDetail:boolean=false;
  showDelete:boolean=false;
  content_edit_post:string;
  showEdit:boolean=false;
  showFuntion:boolean=false;
  idPost:string='';
  load_data:boolean=true;
  list_img:string[] = [] ;
  posts:Post[];
  content_post:string = '';
  profile:any;
  filetoUpload: File = null;
  postEdit:Post;
  postDelete:Post;
  postDetail:Post;
  comments:Comment[];
  input_comment:string;
  imgCurrent:string;
  isWidthAuto:boolean;
  showEditComment:boolean=false;
  _comment:Comment;
  showFunctionComment:boolean = false;
  content_edit_comment:string;
  showDeleteComment:boolean= false;
  constructor( 
    private postService:PostService,
    private profileService:ProfileService,
    private spinner:NgxSpinnerService
    ) { }

  ngOnInit() {
    this.getProfileCurrentUser();
    this.getAllPosts();

  }
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.showDetail = false;
  }
  toggleDeleteComment(){
    this.showDeleteComment = !this.showDeleteComment;
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
  addComment(){
    // console.log(this.input_comment);
    this.postService.addComment(this.input_comment,this.postDetail._id).subscribe(data=>{
      // console.log(data);
      if(data!=null){
      this.comments.unshift(new Comment(data.comment,this.profile,this.postDetail._id,this.input_comment,new Date()));
      // console.log(this.comments);
      this.input_comment='';
      }
    },error=>{
      console.log(error);
    });
  }
  toggleDetail(post,img){
   
    this.showDetail=!this.showDetail;
    if(post!=null){
      this.postDetail = post;
       this.imgCurrent=this.postDetail.imgs[0];
    }
    if(img!=null){
      this.imgCurrent=img;
    }
    this.comments=[];
    // console.log(this.postDetail);
    this.postService.getComments(this.postDetail._id).subscribe(data=>{
      // console.log(data);
      if(data!=null){
        this.comments = data.comments;
        // console.log(this.comments);
      }

    },error=>{
      console.log(error);
    })
  }
  deletePost(){
    this.spinner.show();
    this.showDelete=false;
    this.postService.deletePost(this.postDelete._id).subscribe(data=>{
      // console.log(data);
      this.posts.splice(this.posts.indexOf(this.postDelete),1);
      this.spinner.hide();
    },error=>{
      console.log(error);
      this.spinner.hide();
    })
    
  }
  toggleDelete(post){
    this.showDelete=!this.showDelete;
    if(post!=null){
      this.postDelete=post;
    }
  }
  editPost(){
    this.spinner.show();
    this.showEdit=false;
    // console.log(this.content_edit_post);
    this.postService.editPost(this.content_edit_post,this.postEdit._id).subscribe(data=>{
      // console.log(data);
      this.posts[this.posts.indexOf(this.postEdit)].content = this.content_edit_post;
      this.spinner.hide();
    },error=>{
      console.log(error);
      this.spinner.hide();
    })
  }
  toggleEdit(post){
    if(post!=null){
      this.postEdit = post;
      // console.log(post);
      this.content_edit_post = this.posts[this.posts.indexOf(post)].content;
      // console.log(this.content_edit_post);
    }
    this.showEdit = !this.showEdit;
    this.idPost='';
  }
  tongleFuntion(id){
    // console.log(id+"/"+this.idPost);
    if(this.idPost==id)
    this.idPost='';
    else
    this.idPost = id;
  }
  uploadImg(event){
      this.filetoUpload = event.target.files[0];
      this.profileService.uploadImg(this.filetoUpload).subscribe(data=>{
      // console.log(data.imgId);

      this.list_img.push(data.imgId);

    },error=>{
      console.log(error);
    });
  }
  deleteImg(img){
    this.list_img.splice(this.list_img.indexOf(img),1);
  }
  addPost(){
    if(this.content_post!=''||this.list_img.length>0)
    this.postService.addPost(this.content_post,this.list_img).subscribe(data=>{
      // console.log(data.post);
      // console.log("value: "+this.content_post+"/"+this.list_img);
      if(data!=null){
        // console.log(data);
        this.posts.unshift(new Post(data.post,[],this.profile,this.content_post,new Date(),this.list_img));
        this.content_post='';
        this.list_img =[];
      }
      // if(data!=null){
      //   this.content_post='';
      //   this.list_img.splice(0,this.list_img.length);
      // }
    },error=>{
      console.log(error);
    })
    // console.log(this.content_post);
    // console.log(this.list_img);
  }
  getProfileCurrentUser(){
    this.profileService.profile.subscribe(data=>{
      // console.log(data);
      if(data!=null){
        this.profile = data;
      }
    })
  }
  getAllPosts(){
    this.postService.getAllPost()
    .subscribe(data=>{
      this.posts = data.posts;
      // console.log(this.posts);
      if(data!=null){
        this.load_data = false;
         console.log(this.posts);
      }
    },error=>{
      console.log(error);
    })
  }
  // createRange(number){
  // var items: number[] = [];
  // for(var i = 1; i <= number; i++){
  //    items.push(i);
  // }
  // return items;
  // }
}
