import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

//components
import { ContentHomeComponent } from './components/content-home/content-home.component';
import { FounderComponent } from './components/founder/founder.component';
import { IntroduceComponent } from './components/introduce/introduce.component';
import { CommunnityComponent } from './components/communnity/communnity.component';
const homeRoutes: Routes = [
 {
    path: '',
    component: ContentHomeComponent
  }
];
@NgModule({
  declarations: [
  ContentHomeComponent,
   FounderComponent,
    
    IntroduceComponent,
    CommunnityComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ]
})
export class HomeModule { }
