import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CookieComponent } from './cookie/cookie.component';
import { LegalComponent } from './legal.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { RefundComponent } from './refund/refund.component';

const routes: Routes = [{path:"",component:LegalComponent}, 
{path:"cookies",component:CookieComponent}, 
{path:"privacy",component:PrivacyComponent}, 
{path:"refund",component:RefundComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalRoutingModule { }
