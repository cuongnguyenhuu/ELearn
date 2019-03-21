import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FounderComponent } from './components/founder/founder.component';
import { ContactComponent } from './components/contact/contact.component';
import { IntroduceComponent } from './components/introduce/introduce.component';
import { CommunnityComponent } from './components/communnity/communnity.component';
import { ContentHomeComponent } from './components/content-home/content-home.component';
import { VocabularyComponent } from './components/vocabulary/vocabulary.component';
import { GrammarComponent } from './components/grammar/grammar.component';
import { TestComponent } from './components/test/test.component';
import { ContentCommunityComponent } from './components/content-community/content-community.component';
import { ContentVocabularyComponent } from './components/content-vocabulary/content-vocabulary.component';
import { ContentGrammarComponent } from './components/content-grammar/content-grammar.component';
import { ContentTestComponent } from './components/content-test/content-test.component';
import { ContentProfileComponent } from './components/content-profile/content-profile.component';
import { NotfoundComponent } from './components/notfound/notfound.component';


const appRoutes: Routes = [
 {
    path: '',
    component: ContentHomeComponent
  },
  {
    path: 'community',
    component: ContentCommunityComponent
  },
   {
    path: 'level',
    component: ContentGrammarComponent
  },
   {
    path: 'test',
    component: ContentTestComponent
  },
   {
    path: 'profile',
    component: ContentProfileComponent
  },
   {
    path: '**',
    component: NotfoundComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    FounderComponent,
    ContactComponent,
    IntroduceComponent,
    CommunnityComponent,
    ContentHomeComponent,
    VocabularyComponent,
    GrammarComponent,
    TestComponent,
    ContentCommunityComponent,
    ContentVocabularyComponent,
    ContentGrammarComponent,
    ContentTestComponent,
    ContentProfileComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
