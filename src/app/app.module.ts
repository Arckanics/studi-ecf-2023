import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from "@angular/common/http";
import { modalReducer } from "../store/modal/modal.reducer";
import { headingReducer } from "../store/nav/heading.reducer";
import { ComponentsModule } from "./component/components.module";
import { FrontModule } from "./front/front.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    AppRoutingModule,
    StoreModule.forRoot({ heading: headingReducer, modal: modalReducer }, {}),
    FrontModule,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
