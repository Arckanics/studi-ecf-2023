import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "../routes/home.component";
import { VehiclesComponent } from "../routes/vehicles.component";
import { FrontComponent } from "./front.component";

const routes: Routes = [
  {
    path: "", component: FrontComponent,
    children: [
      { path: "vehicles", component: VehiclesComponent },
      { path: "", component: HomeComponent },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class FrontRoutingModule {
}
