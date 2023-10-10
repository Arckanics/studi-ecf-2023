import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontComponent } from "./front/front.component";
import { HomeComponent } from "./routes/home.component";
import { VehiclesComponent } from "./routes/vehicles.component";

const routes: Routes = [
  {
    path: "",
    component: FrontComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: "vehicles", component: VehiclesComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
