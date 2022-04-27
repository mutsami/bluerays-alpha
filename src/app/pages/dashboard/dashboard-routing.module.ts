import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { MylistingsComponent } from './mylistings/mylistings.component';

const routes: Routes = [{path:"",component:DashboardComponent, canActivate: [AuthGuard]  },
{path:"my-listings",component:MylistingsComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
