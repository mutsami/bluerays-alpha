import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {path:"",component:ListComponent },
  {path:"grid",component:GridComponent },
  {path:"list",component:ListComponent },
  {path:"map",component:MapComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaycationsRoutingModule { }
