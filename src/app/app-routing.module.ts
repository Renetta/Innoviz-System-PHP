import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CareersComponent } from './careers/careers.component';
import { ClientsPageComponent } from './clients-page/clients-page.component';
import { ContactComponent } from './contact/contact.component';
import { DealersComponent } from './dealers/dealers.component';
import { HomeComponent } from './home/home.component';
import { JobAppComponent } from './job-app/job-app.component';
import { PartnersComponent } from './partners/partners.component';
import { ProfileComponent } from './profile/profile.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/home"},
  { path: "home", component: HomeComponent},
  { path: "our-company", component: AboutComponent},
  { path: "services", component: ServicesComponent},
  { path: 'services/:name', component: ServiceDetailsComponent},
  { path: "careers", component: CareersComponent},
  { path: "contact", component: ContactComponent},
  { path: "clients", component: ClientsPageComponent},
  { path: "profile", component: ProfileComponent},
  { path: "careers/job/application/:name/:id", component: JobAppComponent},
  { path: "partners", component: PartnersComponent},
  { path: "certified-dealers", component: DealersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // useHash: true,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
