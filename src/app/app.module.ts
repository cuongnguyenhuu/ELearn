import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HomeModule } from './home/home.module';
import { CommunityModule } from './community/community.module';
import { CourseModule } from './course/course.module';
import { GrammarModule } from './grammar/grammar.module';
import { TestModule } from './test/test.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { ProfileModule } from './profile/profile.module';
import { PostModule } from './post/post.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotificationModule } from './notification/notification.module'
import { ForgotPasswordModule } from './forgot-password/forgot-password.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ContactComponent } from './components/contact/contact.component';

import { VocabularyComponent } from './components/vocabulary/vocabulary.component';
import { GrammarComponent } from './components/grammar/grammar.component';
import { TestComponent } from './components/test/test.component';
import { ResultSearchModule } from './result-search/result-search.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { NotfoundComponent } from './components/notfound/notfound.component';
 
 import { NgxSpinnerModule } from 'ngx-spinner';
//service
import { LoginService} from'./services/login.service'
import { ProfileService } from './services/profile.service'
const appRoutes: Routes = [
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
   ContactComponent,   
    VocabularyComponent,
    GrammarComponent,
    TestComponent,
    NotfoundComponent
  ],
  imports: [
    NgxSpinnerModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    CommunityModule,
    CourseModule,
    GrammarModule,
    TestModule,
    VocabularyModule,
    ProfileModule,
    ResultSearchModule,
    BookmarkModule,
    PostModule,
    NotificationModule,
    ForgotPasswordModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    LoginService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
