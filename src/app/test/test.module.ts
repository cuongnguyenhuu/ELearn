import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { TestService } from './../services/test.service'
 import { FormsModule } from '@angular/forms';
//components
import { ContentTestComponent } from './components/content-test/content-test.component';
const testRoutes: Routes = [
  {
    path: 'level/:course/test',
    component: ContentTestComponent
  }
];
@NgModule({
  declarations: [
  ContentTestComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(testRoutes)
  ],
  providers:
  [
    TestService
  ]
})
export class TestModule { }
