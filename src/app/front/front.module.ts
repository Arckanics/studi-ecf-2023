import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontRoutingModule } from './front-routing.module';
import { FrontComponent } from './front.component';
import { ComponentsModule } from "../component/components.module";
import { HomeComponent } from "../routes/home.component";
import { VehiclesComponent } from "../routes/vehicles.component";
import { CommentComponent } from "../form/comment.component";
import { DynamicFormDirective } from "../modal/dynamic-form.directive";
import { ContactComponent } from "../form/contact.component";
import { StaticCompDirective } from "../modal/static-comp.directive";
import { LoginComponent } from "../form/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MainModalComponent } from "../modal/main-modal.component";
import { StoreModule } from "@ngrx/store";
import { headingReducer } from "../../store/nav/heading.reducer";
import { modalReducer } from "../../store/modal/modal.reducer";


@NgModule({
  declarations: [
    FrontComponent,
    HomeComponent,
    VehiclesComponent,
    CommentComponent,
    DynamicFormDirective,
    ContactComponent,
    StaticCompDirective,
    LoginComponent,
    MainModalComponent
  ],
  imports: [
    CommonModule,
    FrontRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ heading: headingReducer, modal: modalReducer }, {}),
    FormsModule,
  ],
  exports: [
    CommonModule,
    DynamicFormDirective,
    MainModalComponent
  ],
  providers: [
    DynamicFormDirective,
    StaticCompDirective
  ]
})
export class FrontModule { }
