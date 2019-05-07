import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';

//components
import { ContentGrammarComponent } from './components/content-grammar/content-grammar.component';
const grammarRoutes: Routes = [
  {
    path: 'level/:course/grammar/:id',
    component: ContentGrammarComponent
  }
];

@NgModule({
  declarations: [
  ContentGrammarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(grammarRoutes)
  ]
})
export class GrammarModule { }
 