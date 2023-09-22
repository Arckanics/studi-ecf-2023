import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiculesComponent } from "./routes/vehicules.component";
import { HomeComponent } from "./routes/home.component";

const routes: Routes = [
  {path: "vehicules", component: VehiculesComponent},
  {path: "", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
