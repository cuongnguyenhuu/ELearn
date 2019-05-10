import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { ForgotComponent } from './components/forgot/forgot.component';
const forgotRoutes: Routes = [
   {
    path: 'forgot-password',
    component: ForgotComponent
  }
];
@NgModule({
  declarations: [ForgotComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(forgotRoutes)
  ]
})
export class ForgotPasswordModule { }
 