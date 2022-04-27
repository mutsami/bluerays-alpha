import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListpropertyComponent } from './listproperty.component';

const routes: Routes = [{path:"",component:ListpropertyComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListpropertyRoutingModule { }
