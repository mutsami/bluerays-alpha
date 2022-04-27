import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentsComponent } from './apartments/apartments.component';
import { BeachhouseComponent } from './beachhouse/beachhouse.component';
import { CommercialComponent } from './commercial/commercial.component';
import { DuplexComponent } from './duplex/duplex.component';
import { ResidentialComponent } from './residential/residential.component';
import { VillasComponent } from './villas/villas.component';

const routes: Routes = [
{path:"commercial",component:CommercialComponent},
{path:"residential",component:ResidentialComponent},
{path:"villas",component:VillasComponent},
{path:"apartments",component:ApartmentsComponent},
{path:"beach-house",component:BeachhouseComponent},
{path:"duplex",component:DuplexComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
