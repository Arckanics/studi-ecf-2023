import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { setHeading } from "../../store/nav/heading.actions";

@Component({
  selector: 'app-vehicules',
  template: `
      <div class="pt-2 flex-shrink-0 flex-grow-0 mb-2">
        <div class="d-flex justify-content-end mb-1">
          <button class="btn btn-outline-primary d-md-block d-none" data-bs-toggle="collapse"
                     data-bs-target="#filters"
            >Filtres</button>
          <button class="btn btn-outline-primary d-block d-md-none" data-bs-toggle="collapse"
                  data-bs-target="#filters"
          ><i class="bi bi-filter"></i></button>
        </div>
        <div class="collapse bg-white p-2 rounded-2" id="filters">
          <div class="row row-cols-1 row-cols-md-3" >
            <app-filter *ngFor="let filter of filters" [filter]="filter" (filterChange)="updateFilter($event)"></app-filter>

          </div>
          <hr class="my-1">
        </div>
      </div>
      <div id="cars" class="container p-2 m-auto gap-0 row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
        <app-car-card class="col p-3"></app-car-card>
        <app-car-card class="col p-3"></app-car-card>
        <app-car-card class="col p-3"></app-car-card>
        <app-car-card class="col p-3"></app-car-card>
        <app-car-card class="col p-3"></app-car-card>
        <app-car-card class="col p-3"></app-car-card>
        <app-car-card class="col p-3"></app-car-card>
        <app-car-card class="col p-3"></app-car-card>
        <app-car-card class="col p-3"></app-car-card>
        <app-car-card class="col p-3"></app-car-card>
        <app-car-card class="col p-3"></app-car-card>
        <app-car-card class="col p-3"></app-car-card>
      </div>

  `,
  styles: [
    `
      :host {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        flex-shrink: 1;
        max-height: 100%;
      }

      #cars {
        flex-grow: 1;
        flex-shrink: 1;
        overflow: auto;
      }
    `,
    `
      .vehicles {
        padding: 0;
        height: fit-content;
        border-radius: 0.375rem;
        box-shadow: 1px 8px 16px 3px rgba(0, 0, 0, 0.2);
        outline: 3px solid transparent;
        outline-offset: 2px;
        transition: outline-color 125ms ease;
        &:hover {
          outline-color: black;
        }
      }
    `
  ]
})
export class VehiclesComponent {
  public filters = [{
    name: 'Kilomètres',
    minMaxStep: {min:0,max:340000,step:1000},
    values: {min:50000,max:150000},
    id: 'km',
    unit: 'Km'
  },{
    name: 'Année',
    minMaxStep: {min:2010,max:2021,step:1},
    values: {min:2012,max:2019},
    id: 'year',
    unit: ''
  },{
    name: 'Prix',
    minMaxStep: {min:1000,max:50000,step:100},
    values: {min:24000,max:35000},
    id: 'price',
    unit: '€'
  }
  ]

  constructor( private store: Store<{heading:string}>) {
    this.store.dispatch(new setHeading('Nos véhicules'))
  }

  private getFilter(id:string) {
    return this.filters.find(f => f.id === id)
  }

  updateFilter($event:any) {
    let filter = this.getFilter($event.id)
    if (filter) {
      filter = {
        ...filter,
        ...$event
      }
    }
  }
}
