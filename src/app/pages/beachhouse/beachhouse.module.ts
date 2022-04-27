import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeachhouseRoutingModule } from './beachhouse-routing.module';
import { ListComponent } from './list/list.component';
import { GridComponent } from './grid/grid.component';
import { MapComponent } from './map/map.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListComponent,
    GridComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    BeachhouseRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class BeachhouseModule { }
