import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { setHeading } from "../../store/nav/heading.actions";

@Component({
  selector: 'app-home',
  template: `
    <div class="container-lg m-auto row row-cols-1 row-cols-lg-2">
      <div id="services" class="col row row-cols-1 g-4">
        <app-car-service></app-car-service>
        <app-car-service></app-car-service>
        <app-car-service></app-car-service>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent {
  constructor(private store: Store<{ heading: string }>) {
    this.store.dispatch(new setHeading('Accueil'))
  }
}
