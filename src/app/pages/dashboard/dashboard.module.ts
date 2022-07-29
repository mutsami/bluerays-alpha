import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MylistingsComponent } from './mylistings/mylistings.component';
import { UploaderComponent } from './uploader/uploader.component';
import { BlogComponent } from './blog/blog.component';
import { BlogEditpageComponent } from './blog-editpage/blog-editpage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    DashboardComponent,
    MylistingsComponent,
    UploaderComponent,
    BlogComponent,
    BlogEditpageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    AngularEditorModule,
  ]
})
export class DashboardModule { }
