import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegalRoutingModule } from './legal-routing.module';
import { LegalComponent } from './legal.component';
import { PricacyComponent } from './pricacy/pricacy.component';
import { RefundComponent } from './refund/refund.component';
import { CookieComponent } from './cookie/cookie.component';
import { PrivacyComponent } from './privacy/privacy.component';


@NgModule({
  declarations: [
    LegalComponent,
    PricacyComponent,
    RefundComponent,
    CookieComponent,
    PrivacyComponent
  ],
  imports: [
    CommonModule,
    LegalRoutingModule
  ]
})
export class LegalModule { }
