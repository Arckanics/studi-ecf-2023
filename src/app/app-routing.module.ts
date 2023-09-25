import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesComponent } from "./routes/vehicles.component";
import { HomeComponent } from "./routes/home.component";

const routes: Routes = [
  {path: "vehicles", component: VehiclesComponent},
  {path: "", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
