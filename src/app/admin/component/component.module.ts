import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { CarServiceComponent } from './car-service/car-service.component';
import { HoursComponent } from './hours/hours.component';



@NgModule({
  declarations: [
    CommentComponent,
    VehicleComponent,
    CarServiceComponent,
    HoursComponent
  ],
  exports: [
    CommentComponent,
    VehicleComponent,
    CarServiceComponent,
    HoursComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentModule { }
