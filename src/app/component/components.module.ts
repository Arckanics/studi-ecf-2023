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



@NgModule({
  declarations: [
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
  ],
  exports: [
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
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsModule { }