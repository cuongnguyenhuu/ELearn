import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';

//components
import { CourseComponent } from './components/course/course.component';
const courseRoutes: Routes = [
   {
    path: 'level/:course',
    component: CourseComponent
  }
];
@NgModule({
  declarations: [
  	CourseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(courseRoutes)
  ]
})
export class CourseModule { }
