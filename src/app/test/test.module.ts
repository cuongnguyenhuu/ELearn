import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';

//components
import { ContentTestComponent } from './components/content-test/content-test.component';
const testRoutes: Routes = [
  {
    path: 'level/b1/test',
    component: ContentTestComponent
  }
];
@NgModule({
  declarations: [
  ContentTestComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(testRoutes)
  ]
})
export class TestModule { }
