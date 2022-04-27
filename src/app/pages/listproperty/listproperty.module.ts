import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListpropertyRoutingModule } from './listproperty-routing.module';
import { ListpropertyComponent } from './listproperty.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListpropertyComponent
  ],
  imports: [
    CommonModule,
    ListpropertyRoutingModule,
    SharedModule
  ]
})
export class ListpropertyModule { }
