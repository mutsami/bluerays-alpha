import { SubmitPageComponent } from './submit-page/submit-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard'; 
import { GridComponent } from './grid/grid.component';
import { ListComponent } from './list/list.component';
import { ListingsDetailsComponent } from './listings-details/listings-details.component';
import { MapComponent } from './map/map.component'; 
import { SubmitHomesComponent } from './submit-homes/submit-homes.component';
import { SubmitLandComponent } from './submit-land/submit-land.component';
import { SubmitSpacesComponent } from './submit-spaces/submit-spaces.component';
import { SubmitComponent } from './submit/submit.component'; 

const routes: Routes = [{path:"",component:MapComponent}, 
{path:"grid",component:GridComponent},
{path:"list",component:ListComponent},
{path:"map",component:MapComponent},
{path:"submit-page",component:SubmitPageComponent, canActivate: [AuthGuard]},
{path:"submit",component:SubmitComponent, canActivate: [AuthGuard]},
{path:"submit-land",component:SubmitLandComponent, canActivate: [AuthGuard]},
{path:"submit-homes",component:SubmitHomesComponent, canActivate: [AuthGuard]},
{path:"submit-spaces",component:SubmitSpacesComponent, canActivate: [AuthGuard]},
{path:"details/:id",component:ListingsDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingsRoutingModule { }
