import { BlogComponent } from './blog/blog.component';
import { BlogEditpageComponent } from './blog-editpage/blog-editpage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guard/auth.guard'; 
import { DashboardComponent } from './dashboard.component';
import { MylistingsComponent } from './mylistings/mylistings.component';

const routes: Routes = [{path:"",component:DashboardComponent, canActivate: [AuthGuard]  },
{path:"my-listings",component:MylistingsComponent, canActivate: [AuthGuard]  },
{path:"blog",component:BlogComponent, canActivate: [AuthGuard]  }, 
{path:"edit-blog/:id",component:BlogEditpageComponent ,
canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
