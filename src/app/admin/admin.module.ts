import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin.component';
import { AuthService } from "./service/auth-service.service";
import { VehiclesComponent } from './vehicles/vehicles.component';
import { CommentsComponent } from './comments/comments.component';
import { ComponentModule } from "./component/component.module";
import { LoadingComponent } from "../component/ui/loading.component";


@NgModule({
  declarations: [
    HomeComponent,
    AdminComponent,
    VehiclesComponent,
    CommentsComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    ComponentModule,
    AdminRoutingModule,
  ],
  providers: [
    AuthService
  ]
})
export class AdminModule {
}
