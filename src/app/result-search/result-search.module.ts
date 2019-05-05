import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultSearchComponent } from './components/result-search/result-search.component';
import { RouterModule,Routes } from '@angular/router';
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
  ]
})
export class ResultSearchModule { }
 