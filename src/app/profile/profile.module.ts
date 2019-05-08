import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
 import { NgxSpinnerModule } from 'ngx-spinner';
 import { FormsModule } from '@angular/forms';
 import { NotificationModule } from './../notification/notification.module'
//components
import { ContentProfileComponent } from './components/content-profile/content-profile.component';
//service
import { ProfileService } from './../services/profile.service'
import { LoginService } from './../services/login.service'
const profileRoutes: Routes = [
   {
    path: 'profile',
    component: ContentProfileComponent
  }
];
@NgModule({
  declarations: [
  ContentProfileComponent
  ],
  imports: [
    FormsModule,
     NgxSpinnerModule,
    CommonModule,
    NotificationModule,
    RouterModule.forChild(profileRoutes)
  ],
  providers: [
    ProfileService,
    LoginService
  ]
})
export class ProfileModule { }
