import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin.component';
import { AuthService } from "./service/auth-service.service";
import { VehiclesComponent } from './vehicles/vehicles.component';
import { CommentsComponent } from './comments/comments.component';
import { ComponentModule } from "./component/component.module";
import { ComponentsModule } from "../component/components.module";
import { CarServicesComponent } from './car-services/car-services.component';
import { HoursSetupComponent } from './hours-setup/hours-setup.component';
import { ReactiveFormsModule } from "@angular/forms";
import { DatabaseService } from "./service/database.service";
import { AccountsComponent } from './account/accounts.component';


@NgModule({
  declarations: [
    HomeComponent,
    AdminComponent,
    VehiclesComponent,
    CommentsComponent,
    CarServicesComponent,
    HoursSetupComponent,
    AccountsComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ComponentModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    DatabaseService
  ]
})
export class AdminModule {
}
