import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { ButtonComponent } from './component/ui/button.component';
import { HomeComponent } from './routes/home.component';
import { VehiclesComponent } from './routes/vehicles.component';
import { DoubleRangeComponent } from './component/ui/double-range.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ContentHeaderComponent } from './component/content-header.component';
import { StoreModule } from '@ngrx/store';
import { FilterComponent } from './component/ui/filter.component';
import { LongNumberPipe } from './pipes/long-number.pipe';
import { CarCardComponent } from './component/car-card.component';
import { HttpClientModule } from "@angular/common/http";
import { LoadingComponent } from './component/ui/loading.component';
import { CarServiceComponent } from './component/car-service.component';
import { ClientNoteComponent } from './component/client-note.component';
import { NoteStarComponent } from './component/ui/note-star.component';
import { MainModalComponent } from "./modal/main-modal.component";
import { DynamicFormDirective } from './modal/dynamic-form.directive';
import { CommentComponent } from "./form/comment.component";
import { modalReducer } from "../store/modal/modal.reducer";
import { headingReducer } from "../store/nav/heading.reducer";
import { ContactComponent } from './form/contact.component';
import { NoteInputComponent } from './component/ui/note-input.component';

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
    CarCardComponent,
    LoadingComponent,
    CarServiceComponent,
    ClientNoteComponent,
    CommentComponent,
    NoteStarComponent,
    MainModalComponent,
    DynamicFormDirective,
    ContactComponent,
    NoteInputComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ heading: headingReducer, modal: modalReducer }, {}),
    FormsModule,
  ],
  providers: [DynamicFormDirective],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
