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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ContentHeaderComponent } from './component/content-header.component';
import { StoreModule } from '@ngrx/store';
import { headingReducer } from "../store/nav/heading.reducer";
import { FilterComponent } from './component/filter.component';
import { LongNumberPipe } from './pipes/long-number.pipe';
import { CarCardComponent } from './component/car-card.component';

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
    ContentHeaderComponent,
    FilterComponent,
    LongNumberPipe,
    CarCardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ heading: headingReducer }, {}),
    FormsModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
