import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingsRoutingModule } from './listings-routing.module';
import { SubmitComponent } from './submit/submit.component';
import { MapService } from 'src/app/services/map.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GridComponent } from './grid/grid.component';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { UploadListComponent } from './upload-list/upload-list.component';
import { UploadDetailsComponent } from './upload-details/upload-details.component';
import { ListingsDetailsComponent } from './listings-details/listings-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubmitLandComponent } from './submit-land/submit-land.component';
import { SubmitHomesComponent } from './submit-homes/submit-homes.component';
import { SubmitSpacesComponent } from './submit-spaces/submit-spaces.component';
import { SubmitPageComponent } from './submit-page/submit-page.component'; 


@NgModule({
  declarations: [
    SubmitComponent,
    GridComponent,
    ListComponent,
    MapComponent,
    UploadFormComponent,
    UploadListComponent,
    UploadDetailsComponent,
    ListingsDetailsComponent,
    SubmitLandComponent,
    SubmitHomesComponent,
    SubmitSpacesComponent,
    SubmitPageComponent
  ],
  imports: [
    CommonModule,
    ListingsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    
    
  ],
  providers: [
    MapService
  ],
})
export class ListingsModule { }
