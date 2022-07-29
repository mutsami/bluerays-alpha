import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

const routes: Routes = [{path:"",component:HomeComponent},
{
  path: 'login',
  loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
},
{
  path: 'register',
  loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
},
{
  path: 'listings',
  loadChildren: () => import('./pages/listings/listings.module').then(m => m.ListingsModule)
},
{
  path: 'about',
  loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
},
{
  path: 'services',
  loadChildren: () => import('./pages/services/services.module').then(m => m.ServicesModule)
},
{
  path: 'faq',
  loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqModule)
},
{
  path: 'pricing',
  loadChildren: () => import('./pages/pricing/pricing.module').then(m => m.PricingModule)
},
{
  path: 'contact',
  loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
},
{
  path: 'blog',
  loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)
},
{
  path: 'legal',
  loadChildren: () => import('./pages/legal/legal.module').then(m => m.LegalModule)
},
{
  path: 'dashboard',
  loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
},
{
  path: 'sign-in',
  loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
}, 
{ path: 'register-user', component: SignUpComponent }, 
{ path: 'forgot-password', component: ForgotPasswordComponent },
{ path: 'verify-email-address', component: VerifyEmailComponent },
{
  path: 'land-sale',
  loadChildren: () => import('./pages/land-sale/land-sale.module').then(m => m.LandSaleModule)
},
{
  path: 'land-lease',
  loadChildren: () => import('./pages/land-lease/land-lease.module').then(m => m.LandLeaseModule)
},
{
  path: 'staycations',
  loadChildren: () => import('./pages/staycations/staycations.module').then(m => m.StaycationsModule)
},
{
  path: 'event-spaces',
  loadChildren: () => import('./pages/event-spaces/event-spaces.module').then(m => m.EventSpacesModule)
},
{
  path: 'office-space',
  loadChildren: () => import('./pages/office-space/office-space.module').then(m => m.OfficeSpaceModule)
},
{
  path: 'home-sale',
  loadChildren: () => import('./pages/residential/residential.module').then(m => m.ResidentialModule)
},
{
  path: 'home-rent',
  loadChildren: () => import('./pages/commercial/commercial.module').then(m => m.CommercialModule)
},
{
  path: 'staycations',
  loadChildren: () => import('./pages/apartments/apartments.module').then(m => m.ApartmentsModule)
},
{
  path: 'beach-house',
  loadChildren: () => import('./pages/beachhouse/beachhouse.module').then(m => m.BeachhouseModule)
},
{
  path: 'duplex',
  loadChildren: () => import('./pages/duplex/duplex.module').then(m => m.DuplexModule)
}

];


@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
