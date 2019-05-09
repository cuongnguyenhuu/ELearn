import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultSearchComponent } from './components/result-search/result-search.component';
import { RouterModule,Routes } from '@angular/router';
import {SearchService} from './../services/search.service'
import { NotificationModule} from './../notification/notification.module'
const searchRoutes: Routes = [
   {
    path: 'search',
    component: ResultSearchComponent
  }
];
@NgModule({
  declarations: [ResultSearchComponent],
  imports: [
    NotificationModule,
    CommonModule,
    RouterModule.forChild(searchRoutes)
  ],
  providers:[
  SearchService
  ]
})
export class ResultSearchModule { }
 