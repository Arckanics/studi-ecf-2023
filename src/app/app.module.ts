import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './routes/home.component';
import { VehiclesComponent } from './routes/vehicles.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from "@angular/common/http";
import { MainModalComponent } from "./modal/main-modal.component";
import { DynamicFormDirective } from './modal/dynamic-form.directive';
import { CommentComponent } from "./form/comment.component";
import { modalReducer } from "../store/modal/modal.reducer";
import { headingReducer } from "../store/nav/heading.reducer";
import { ContactComponent } from './form/contact.component';
import { ComponentsModule } from "./component/components.module";
import { StaticCompDirective } from './modal/static-comp.directive';
import { LoginComponent } from './form/login.component';
import { AppFrontComponent } from './app-front/app-front.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    VehiclesComponent,
    CommentComponent,
    MainModalComponent,
    DynamicFormDirective,
    ContactComponent,
    StaticCompDirective,
    LoginComponent,
    AppFrontComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    ComponentsModule,
    AppRoutingModule,
    StoreModule.forRoot({ heading: headingReducer, modal: modalReducer }, {}),
    FormsModule,
  ],
  providers: [DynamicFormDirective],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
