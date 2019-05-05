import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { RouterModule,Routes } from '@angular/router';
const bookmarkRoutes: Routes = [
   {
    path: 'bookmark',
    component: BookmarkComponent
  }
];
@NgModule({
  declarations: [BookmarkComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(bookmarkRoutes)
  ]
})
export class BookmarkModule { }
