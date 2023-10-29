import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { CarServiceComponent } from './car-service/car-service.component';
import { HoursComponent } from './hours/hours.component';
import { ModalComponent } from './modal.component';
import { AccountComponent } from './account/account.component';


@NgModule({
  declarations: [
    CommentComponent,
    VehicleComponent,
    CarServiceComponent,
    HoursComponent,
    ModalComponent,
    AccountComponent
  ],
  exports: [
    CommentComponent,
    VehicleComponent,
    CarServiceComponent,
    HoursComponent,
    ModalComponent,
    AccountComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentModule {
}
