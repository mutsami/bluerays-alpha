import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandLeaseRoutingModule } from './land-lease-routing.module';
import { GridComponent } from './grid/grid.component';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GridComponent,
    ListComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    LandLeaseRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class LandLeaseModule { }
