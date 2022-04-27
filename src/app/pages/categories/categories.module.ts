import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { ApartmentsComponent } from './apartments/apartments.component';
import { BeachhouseComponent } from './beachhouse/beachhouse.component';
import { CommercialComponent } from './commercial/commercial.component';
import { DuplexComponent } from './duplex/duplex.component';
import { ResidentialComponent } from './residential/residential.component';
import { VillasComponent } from './villas/villas.component';
import { MapService } from 'src/app/services/map.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CommercialComponent,
    ResidentialComponent,
    VillasComponent,
    ApartmentsComponent,
    BeachhouseComponent,
    DuplexComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers:[
    MapService 
  ]
})
export class CategoriesModule { }
