import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
//service
import { PostService } from'./../services/post.service';
import { TagService } from'./../services/tag.service';
import { NotificationModule} from './../notification/notification.module'
//components
import { ContentCommunityComponent } from './components/content-community/content-community.component';

//directive
import { ClickOutside } from './../directive/clickOutSide.directive'
const communityRoutes: Routes = [
  {
    path: 'community',
    component: ContentCommunityComponent
  }
];
@NgModule({
  declarations: [
   ContentCommunityComponent,
   ClickOutside
   ],
  imports: [
    FormsModule,
    CommonModule,
    NotificationModule,
    RouterModule.forChild(communityRoutes)
  ],
  providers: [
    PostService,
    TagService
  ]
})
export class CommunityModule { }
