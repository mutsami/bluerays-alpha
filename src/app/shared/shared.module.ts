import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Nav2Component } from './navbar2/nav2/nav2.component';
import { RouterModule } from '@angular/router';
import { RecentListingsSmComponent } from './recent-listings-sm/recent-listings-sm.component';
import { RecentListingsComponent } from './recent-listings/recent-listings.component';
import { NgAisModule } from 'angular-instantsearch';
import { MortgageComponent } from './mortgage/mortgage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecentListingsGridComponent } from './recent-listings-grid/recent-listings-grid.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe'; 
import { TimeagoModule } from 'ngx-timeago';



@NgModule({
  declarations: [
    Nav2Component,RecentListingsSmComponent,RecentListingsComponent, MortgageComponent, RecentListingsGridComponent, SanitizeHtmlPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgAisModule.forRoot(),
    
  ],
  exports: [Nav2Component,RecentListingsSmComponent,RecentListingsComponent
    ,NgAisModule,MortgageComponent,RecentListingsGridComponent,SanitizeHtmlPipe,TimeagoModule]
})
export class SharedModule { }
