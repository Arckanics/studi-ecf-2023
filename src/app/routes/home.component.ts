import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { setHeading } from "../../store/nav/heading.actions";
import { HomeFeatureService } from "../services/home-feature.service";

@Component({
  selector: 'app-home',
  template: `
    <div id="home" class="container-lg m-auto h-100 d-flex pt-2">
      <div id="services" class="flex-grow-1 flex-shrink-1 home-component">
        <h3 class="h4 f-rajdhani component-title">Services</h3>
        <hr class="m-1">
        <div class="list">
          <app-car-service *ngFor="let feat of features$" [feat]="feat"></app-car-service>
        </div>
      </div>
      <div id="comment" class="flex-grow-1 flex-shrink-1 home-component">
        <h3 class="h4 f-rajdhani component-title">Commentaires</h3>
        <hr class="m-1">
        <div class="list">
          <app-car-service *ngFor="let feat of features$" [feat]="feat"></app-car-service>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        height: 100%;
        display: block;
        overflow: hidden;
        & > * {
          display: block;
        }
      }
      .home-component {
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .component-title {
          padding: 0 .9rem;
          margin: 0;
        }
        .list {
          display: flex;
          flex-direction: column;
          gap: .8rem;
          padding: 0 .9rem;
          padding-bottom: 1rem;
          overflow-y: auto;
        }
      }

      #services {
        position: relative;
        height: 100%;
      }
    `
  ]
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
