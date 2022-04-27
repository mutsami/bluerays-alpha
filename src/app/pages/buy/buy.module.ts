import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyRoutingModule } from './buy-routing.module';
import { BuyComponent } from './buy.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MapService } from 'src/app/services/map.service';


@NgModule({
  declarations: [
    BuyComponent
  ],
  imports: [
    CommonModule,
    BuyRoutingModule,
    SharedModule
  ],
  providers: [
    MapService
  ],
})
export class BuyModule { }
