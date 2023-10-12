import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin.component';
import { AuthService } from "./service/auth-service.service";
import { VehiclesComponent } from './vehicles/vehicles.component';
import { CommentsComponent } from './comments/comments.component';


@NgModule({
  declarations: [
    HomeComponent,
    AdminComponent,
    VehiclesComponent,
    CommentsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  providers: [
    AuthService
  ]
})
export class AdminModule {
}
