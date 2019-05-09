import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';
import { RouterModule,Routes } from '@angular/router';
 import { FormsModule } from '@angular/forms';

import { PostService } from'./../services/post.service';
import { TagService } from'./../services/tag.service';
import { NotificationModule} from './../notification/notification.module'
const postRoutes: Routes = [
   {
    path: 'post/:id',
    component: PostComponent
  }
];
@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    NotificationModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(postRoutes)
  ],
  providers:[
    PostService,
    TagService
  ]
})
export class PostModule { }
