import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { setHeading } from "../../store/nav/heading.actions";

@Component({
  selector: 'app-vehicules',
  template: `
    <div class="row row-cols-3 mt-4 pt-3">
      <app-double-range id="km"
                        [minMaxStep]="{min:0,max:200000,step:1000}"
                        [initInput]="{min:50000,max:150000}"
      ></app-double-range>
    </div>

  `,
  styles: []
})
export class VehiclesComponent {
  filters = [{
    name: 'Kilomètres',
    minMaxStep: {min:0,max:340000,step:1000},
    unit: 'Km'
  }]

  constructor( private store: Store<{heading:string}>) {
    this.store.dispatch(new setHeading('Nos véhicules'))
  }
}
