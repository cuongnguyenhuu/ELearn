import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
//service
import { PostService } from'./../services/post.service';

//components
import { ContentCommunityComponent } from './components/content-community/content-community.component';
const communityRoutes: Routes = [
  {
    path: 'community',
    component: ContentCommunityComponent
  }
];
@NgModule({
  declarations: [
   ContentCommunityComponent
   ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(communityRoutes)
  ],
  providers: [
    PostService
  ]
})
export class CommunityModule { }
