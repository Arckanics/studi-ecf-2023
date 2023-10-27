import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { setHeading } from "../../store/nav/heading.actions";
import { CarService } from "../services/car.service";

@Component({
  selector: 'app-vehicules',
  template: `
      <div class="pt-2 flex-shrink-0 flex-grow-0 mb-2 position-relative">
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
        <app-loading *ngIf="!cars$"></app-loading>
        <app-car-card *ngFor="let car of cars$" [car]="car" class="col p-3"></app-car-card>

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
        height: fit-content;
        max-height: 100%;
      }

      #cars {
        flex-grow: 1;
        flex-shrink: 1;
        overflow: auto;
        height: 100%;
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
export class VehiclesComponent implements OnInit {
  public filters = [ {
    name: 'Kilomètres',
    minMaxStep: { min: 0, max: 340000, step: 1000 },
    values: { min: 50000, max: 50000 },
    id: 'km',
    unit: 'Km'
  }, {
    name: 'Année',
    minMaxStep: { min: 2010, max: 2021, step: 1 },
    values: { min: 2, max: 2019 },
    id: 'year',
    unit: ''
  }, {
    name: 'Prix',
    minMaxStep: { min: 1000, max: 50000, step: 100 },
    values: { min: 24000, max: 35000 },
    id: 'price',
    unit: '€'
  }
  ]

  public cars$: any = null
  public carsData$: any = null

  constructor(
    private store: Store<{ heading: string }>,
    private carService: CarService
  ) {
    this.store.dispatch(new setHeading('Nos véhicules'))
  }

  ngOnInit() {
    const date = new Date()
    const year = this.filters.find(f => f.id === 'year')
    if (year) {
      year.minMaxStep.min = date.getFullYear()
      year.minMaxStep.max = date.getFullYear()
    }
    this.carService.getCars().subscribe({
      next: (data: any) => {
        this.setupFilters(data)
        this.carsData$ = data
        return this.cars$ = data
      },
      error: (e) => console.log(e),
    })
  }

  private setupFilters(data: any) {
    const filters = this.filters
    for (let [ k, value ] of Object.entries(filters)) {
      const feature = value.id
      let sorting = data.sort((a: any, b: any) => {
        if (a[feature] < b[feature]) {
          return -1
        }
        if (a[feature] > b[feature]) {
          return 1
        }
        return 0
      })
      const minMax = { min: sorting[0][feature], max: sorting[sorting.length - 1][feature] }
      value.minMaxStep = {
        ...value.minMaxStep,
        ...minMax
      }
      value.values = {
        ...value.values,
        ...minMax
      }
      filters[Number(k)] = { ...value }
    }
  }

  private getFilter(id: string) {
    return this.filters.find(f => f.id === id)
  }

  private applyFilters() {
    let res = [ ...this.carsData$ ]
    for (let value of Object.values(this.filters)) {
      res = res.filter((car) => {
        return !(car[value.id] < value.values.min || car[value.id] > value.values.max);
      })
    }
    this.cars$ = [ ...res ]
  }

  updateFilter($event: any) {
    let filter = this.getFilter($event.id)
    if (filter) {
      filter = {
        ...filter,
        ...$event
      }
      this.applyFilters()
    }
  }
}
