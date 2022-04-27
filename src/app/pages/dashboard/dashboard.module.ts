import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MylistingsComponent } from './mylistings/mylistings.component';
import { UploaderComponent } from './uploader/uploader.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MylistingsComponent,
    UploaderComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
