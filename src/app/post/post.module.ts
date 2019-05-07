import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';
import { RouterModule,Routes } from '@angular/router';
 import { FormsModule } from '@angular/forms';


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
    CommonModule,
    FormsModule,
    RouterModule.forChild(postRoutes)
  ]
})
export class PostModule { }
