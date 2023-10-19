import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from "./admin.component";
import { HomeComponent } from "./home/home.component";
import { authGuard } from "./auth.guard";
import { VehiclesComponent } from "./vehicles/vehicles.component";
import { CommentsComponent } from "./comments/comments.component";
import { CarServicesComponent } from "./car-services/car-services.component";
import { HoursSetupComponent } from "./hours-setup/hours-setup.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    canActivate: [ authGuard ],
    children: [
      { path: "vehicles", component: VehiclesComponent },
      { path: "comments", component: CommentsComponent },
      { path: "services", component: CarServicesComponent },
      { path: "hours", component: HoursSetupComponent },
      { path: "", component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule {
}
