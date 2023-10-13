import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment/comment.component';
import { VehicleComponent } from './vehicle/vehicle.component';



@NgModule({
  declarations: [
    CommentComponent,
    VehicleComponent
  ],
  exports: [
    CommentComponent,
    VehicleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentModule { }
