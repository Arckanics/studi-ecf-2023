import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { setHeading } from "../../store/nav/heading.actions";

@Component({
  selector: 'app-vehicules',
  template: `
    <div class="row row-cols-3 mt-4 pt-3">
      <div *ngFor="let filter of filters" class="d-flex flex-column gap-2">
        <div class="p-2">{{ filter.name }} :</div>
        <app-double-range
          [id]="filter.id"
          [minMaxStep]="filter.minMaxStep"
          [(values)]="filter.values"
        >
        </app-double-range>
        <div class="d-flex justify-content-between py-3">
          <div class="text-secondary small-text p-2">
            <span>{{filter.values.min}}{{filter.unit}}</span>
            -
            <span>{{filter.values.max}}{{filter.unit}}</span>
          </div>
          <button class="btn btn-light shadow-sm btn-sm" (click)="resetFilter(filter.id)">réinitialiser</button>
        </div>
      </div>
    </div>

  `,
  styles: [
    `
      .small-text {
        font-size: .9rem;
      }
    `
  ]
})
export class VehiclesComponent {
  filters = [{
    name: 'Kilomètres',
    minMaxStep: {min:0,max:340000,step:1000},
    values: {min:50000,max:150000},
    id: 'km',
    unit: 'Km'
  }]

  constructor( private store: Store<{heading:string}>) {
    this.store.dispatch(new setHeading('Nos véhicules'))
  }

  private getFilter(id:string) {
    return this.filters.find(f => f.id === id)
  }

  onDrChange($event:any, id: string) {
    const filter = this.getFilter(id)
    if (filter) {
      filter.values = {min:$event.min,max:$event.max}
    }
  }

  resetFilter(id:string) {
    const filter = this.getFilter(id)
    if (filter) {
      const {min,max} = filter.minMaxStep
      filter.values = {
        min: min,
        max: max
      }
    }
  }
}
