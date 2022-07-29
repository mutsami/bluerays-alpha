import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandSaleRoutingModule } from './land-sale-routing.module';
import { MapComponent } from './map/map.component';
import { ListComponent } from './list/list.component';
import { GridComponent } from './grid/grid.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MapComponent,
    ListComponent,
    GridComponent
  ],
  imports: [
    CommonModule,
    LandSaleRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class LandSaleModule { }
