import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { NotificationModule} from './../notification/notification.module'
//components
import { ContentVocabularyComponent } from './components/content-vocabulary/content-vocabulary.component';
const vocabularyRoutes: Routes = [
  {
    path: 'level/:course/vocabulary/:id',
    component: ContentVocabularyComponent
  }
];
@NgModule({
  declarations: [
  ContentVocabularyComponent
  ],
  imports: [
  NotificationModule,
    CommonModule,
    RouterModule.forChild(vocabularyRoutes)
  ]
})
export class VocabularyModule { }
