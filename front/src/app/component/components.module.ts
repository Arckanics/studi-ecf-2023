import { NgModule } from '@angular/core';
import { ContentHeaderComponent } from "./content-header.component";
import { ClientNoteComponent } from "./client-note.component";
import { CarServiceComponent } from "./car-service.component";
import { CarCardComponent } from "./car-card.component";
import { ButtonComponent } from "./ui/button.component";
import { DoubleRangeComponent } from "./ui/double-range.component";
import { FilterComponent } from "./ui/filter.component";
import { LoadingComponent } from "./ui/loading.component";
import { NoteInputComponent } from "./ui/note-input.component";
import { NoteStarComponent } from "./ui/note-star.component";
import { CommonModule } from "@angular/common";
import { LongNumberPipe } from "../pipes/long-number.pipe";
import { ReactiveFormsModule } from "@angular/forms";
import { HoursComponent } from './hours.component';
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from "../header/header.component";
import { NavigationComponent } from "../navigation/navigation.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    ContentHeaderComponent,
    ClientNoteComponent,
    CarServiceComponent,
    CarCardComponent,
    ButtonComponent,
    DoubleRangeComponent,
    FilterComponent,
    LoadingComponent,
    NoteInputComponent,
    NoteStarComponent,
    LongNumberPipe,
    HoursComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    NavigationComponent,
    ContentHeaderComponent,
    ClientNoteComponent,
    CarServiceComponent,
    CarCardComponent,
    ButtonComponent,
    DoubleRangeComponent,
    FilterComponent,
    LoadingComponent,
    NoteInputComponent,
    NoteStarComponent,
    LongNumberPipe,
    FooterComponent,
    HoursComponent
  ],

  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class ComponentsModule {
}
