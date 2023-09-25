import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  template: `
    <div class="d-flex flex-column gap-2">
      <div class="p-2">{{ filter.name }} :</div>
      <app-double-range
        [id]="filter.id"
        [minMaxStep]="filter.minMaxStep"
        [(values)]="filter.values"
        (valuesChange)="emitChange()"
      >
      </app-double-range>
      <div class="d-flex justify-content-between py-3">
        <div class="text-secondary small-text p-2">
          <span>{{filter.values.min}}{{filter.unit}}</span>
          -
          <span>{{filter.values.max}}{{filter.unit}}</span>
        </div>
        <button class="btn btn-light shadow-sm btn-sm" (click)="resetFilter()">réinitialiser</button>
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
export class FilterComponent {
  @Input() filter!:{
    name: string,
    minMaxStep: {min:number,max:number,step:number},
    values: {min:number,max:number},
    id: string,
    unit: string
  };
  @Output() filterChange = new EventEmitter<any>()

  constructor() {

  }

  resetFilter() {
    let filter = this.filter
    if (filter) {
      const {min,max} = filter.minMaxStep
      filter.values = {
        min: min,
        max: max
      }
    }
    this.emitChange()
  }

  emitChange() {
    this.filterChange.emit(this.filter)
  }
}
