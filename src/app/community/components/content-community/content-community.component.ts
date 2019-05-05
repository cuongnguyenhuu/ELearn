import { Component, OnInit,HostListener  } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
//service
import { PostService } from './../../../services/post.service'
import { ProfileService } from './../../../services/profile.service'
import { TagService } from './../../../services/tag.service'
//models
import { Post } from './../../../models/post.class';
import { Comment } from './../../../models/comment.class';
//directive
import { ClickOutside } from './../../../directive/clickOutSide.directive'
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
  pageNumber=0;
  postLoadMore:Post[];
  isLoaded:boolean=true;
  showTag:boolean = false;
  tags:any[];
  tagsSelected:any[]=[];
  objectTag:any={};
  listEmoji=["😀","😁","😂","😃","😄","😅","😆","😇","😈","😉","😊","😋","😌","😍","😎","😏","😐","😑","😒","😓","😔","😕","😖","😗","😘","😙","😚","😛","😜","😝","😞","😟","😠","😡","😢","😣","😤","😥","😦","😧","😨","😩","😪","😫","😬","😭","😮","😯","😰","😱","😲","😳","😴","😵","😶","😷","🙁","🙂","🙃","🙄","🤐","🤑","🤒","🤓","🤔","🤕","🤠","🤡","🤢","🤣","🤤","🤥","🤧","🤨","🤩","🤪","🤫","🤬","🤭","🤮","🤯","🧐"]
  showEmoji:boolean=false;
  tagGetPosts:string;
  constructor( 
    private postService:PostService,
    private profileService:ProfileService,
    private spinner:NgxSpinnerService,
    private tagService:TagService,
    private routerService: Router,
    private activatedRouteService: ActivatedRoute
    ) { }

  ngOnInit() {
    this.activatedRouteService.queryParams.subscribe(data=>{
      // console.log(data);
      // if(data["tag"]!=null){
      this.tagGetPosts = data["tag"];
      // this.posts=[];
      this.posts=[];
      this.load_data=true;
      this.pageNumber=0;
       this.isLoaded=true;
      if(this.tagGetPosts==null){
        
        this.getAllPosts(0,null);
        this.tagService.getAllTag().subscribe(data=>{
        console.log(data);
        if(data!=null){
          this.tags = data.tags;
          this.tags.forEach(tag=>{
            this.objectTag[tag._id]=tag.name;
          });
          console.log(this.objectTag);
        }
      },error=>{
        console.log(error);
     });
       
        console.log("null");
      }
      else{
        // this.pageNumber=0;
        this.tagService.getAllTag().subscribe(data=>{
        console.log(data);
        if(data!=null){
          this.tags = data.tags;
          this.tags.forEach(tag=>{
            this.objectTag[tag._id]=tag.name;
          });
           this.tags.forEach(tag=>{
          if(tag.name==this.tagGetPosts){
            this.getAllPosts(0,tag._id);
          }
        });
          console.log(this.objectTag);
        }
      },error=>{
        console.log(error);
     });
       
      }
      // }
    });
    
    // this.getAllPosts(this.pageNumber);
   
    this.getProfileCurrentUser();
    
    
  }
  @HostListener('document:scroll', ['$event'])
    onScroll(e) {
      if(this.posts!=null&&this.posts.length>5){
      let heightPostLast = document.getElementById(this.posts[this.posts.length-5]._id);
      // console.log(window.pageYOffset+"/"+heightPostLast.offsetTop);
      if(window.pageYOffset>heightPostLast.offsetTop && this.isLoaded==true){
        // console.log(this.tagGetPosts);
         // console.log("page number: " +this.pageNumber);
        if(this.tagGetPosts!=null){
           this.tags.forEach(tag=>{
          if(tag.name==this.tagGetPosts){
             this.loadMore(tag._id);
          }
        });
        } 
        else{
         this.loadMore(null);
         }
         console.log("call");
        }   
        }  
    // }
    }
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.showDetail = false;
  }
  postByTag(tag_name){
    // console.log("navigate"+tag_name);
    this.routerService.navigate(['/community'],{queryParams: {tag: this.objectTag[tag_name]}});
  }
  addIcon(icon){
    this.content_post +=icon; 
  }
  toggle_emoji(){
    this.showEmoji=!this.showEmoji;
  }
  add_remove_tag(tag){
    if(this.tagsSelected.indexOf(tag)==-1){
      this.tagsSelected.push(tag);
    }else{
      this.tagsSelected = this.tagsSelected.filter(function(value,index,arr){
        return value!=tag;
      });
    }
  }
  toggle_tag(){
    console.log("click tag");
    this.showTag = !this.showTag;
  }
  like(post){
    // console.log(post);
    // this.posts[this.posts.indexOf[post]].isLike=!this.posts[this.posts.indexOf[post]].isLike;
    if(post.isLiked==false){
    this.postService.addLike(post._id).subscribe(data=>{
      console.log(data);
      // console.log(this.posts.indexOf(post));
      this.posts[this.posts.indexOf(post)].likes =this.posts[this.posts.indexOf(post)].likes +1 ;
      this.posts[this.posts.indexOf(post)].isLiked = true;
    },error=>{
      console.log(error);
    })
    }
    else{
      this.postService.unLike(post._id).subscribe(data=>{
        console.log(data);
        this.posts[this.posts.indexOf(post)].likes =this.posts[this.posts.indexOf(post)].likes -1 ;
        this.posts[this.posts.indexOf(post)].isLiked = false;
      },error=>{
        console.log(error);
      })
    }
  }
  loadMore(tag_id){
    this.isLoaded=false;
    this.load_data=true;
    this.pageNumber++;
     this.postService.getAllPost(this.pageNumber,tag_id).subscribe(data=>{
       if(data!=null){
           
           this.postLoadMore = data.posts;
           if(this.postLoadMore.length==0){
             this.isLoaded=false;
             this.load_data=false;
           }
           else{
           this.posts = this.posts.concat(data.posts);
           console.log(this.posts);
           console.log(data.posts);
           
           this.isLoaded=true;
           this.load_data=false;
         }
       }
     },error=>{
       console.log(error);
     }) 
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
      this.posts[this.posts.indexOf(this.postDetail)].comments = this.posts[this.posts.indexOf(this.postDetail)].comments +1;
      // this.postDetail.comments= this.postDetail.comments+1;
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
    let list_id_tag_selected:string[]=[];
    for (var i = 0; i < this.tagsSelected.length; ++i) {
        list_id_tag_selected[i] = this.tagsSelected[i]._id;
      }
    if(this.content_post!=''||this.list_img.length>0)
    this.postService.addPost(this.content_post,this.list_img,this.tagsSelected).subscribe(data=>{
      // console.log(data.post);
      // console.log("value: "+this.content_post+"/"+this.list_img);
      if(data!=null){
        // console.log(data);
        this.posts.unshift(new Post(data.post,list_id_tag_selected,this.profile,this.content_post,new Date(),this.list_img,0,0));
        this.content_post='';
        this.tagsSelected=[];
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
  getAllPosts(pageNumber,tag_id){
    this.postService.getAllPost(pageNumber,tag_id)
    .subscribe(data=>{
      this.posts = data.posts;
      // console.log(this.posts);
      if(data!=null){
        this.load_data = false;
         console.log(this.posts);
      }
    },error=>{
      console.log(error);
    });
    
  }
  // createRange(number){
  // var items: number[] = [];
  // for(var i = 1; i <= number; i++){
  //    items.push(i);
  // }
  // return items;
  // }
}
