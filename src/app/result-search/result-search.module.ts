import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultSearchComponent } from './components/result-search/result-search.component';
import { RouterModule,Routes } from '@angular/router';
import {SearchService} from './../services/search.service'
const searchRoutes: Routes = [
   {
    path: 'search',
    component: ResultSearchComponent
  }
];
@NgModule({
  declarations: [ResultSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(searchRoutes)
  ],
  providers:[
  SearchService
  ]
})
export class ResultSearchModule { }
 