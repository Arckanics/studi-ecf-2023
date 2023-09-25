import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { ButtonComponent } from './component/button.component';
import { HomeComponent } from './routes/home.component';
import { VehiclesComponent } from './routes/vehicles.component';
import { DoubleRangeComponent } from './component/double-range.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ContentHeaderComponent } from './component/content-header.component';
import { StoreModule } from '@ngrx/store';
import { headingReducer } from "../store/nav/heading.reducer";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    ButtonComponent,
    HomeComponent,
    VehiclesComponent,
    DoubleRangeComponent,
    ContentHeaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ heading: headingReducer }, {}),
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
