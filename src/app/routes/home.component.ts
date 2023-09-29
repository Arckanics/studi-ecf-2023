import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { setHeading } from "../../store/nav/heading.actions";
import { HomeFeatureService } from "../services/home-feature.service";

@Component({
  selector: 'app-home',
  template: `
    <div class="container-lg m-auto row row-cols-1 row-cols-lg-2">
      <div>
        <h3 class="h4 f-rajdhani">Services</h3>
        <div id="services" class="row row-cols-1 g-4">
          <app-car-service *ngFor="let feat of features$" [feat]="feat"></app-car-service>
        </div>
      </div>
      <div id="comment" class="row row-cols-1 g-4">
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  features$: any = null
  constructor(
    private store: Store<{ heading: string }>,
    private features: HomeFeatureService
  ) {
    this.store.dispatch(new setHeading('Accueil'))
  }

  ngOnInit(): void {
    this.features.getFeatures().subscribe({
      next: (data: any) => this.features$ = data,
      error: (err:any) => console.log(err),
      complete: () => {}
    })
  }


}
