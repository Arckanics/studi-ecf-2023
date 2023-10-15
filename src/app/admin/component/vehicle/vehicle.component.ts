import { Component, Input } from '@angular/core';

export type vehicle = {
  id: number,
  year: number,
  km: number,
  price: number,
  name: string,
  fuel: string,
  mainPicture: string,
  options: string[],
  galerie: string[]
}

@Component({
  selector: 'app-vehicle',
  template: `
    <div class="car m-2 user-select-none">
      <div class="row align-items-center car-header">
        <div class="text-decoration-underline col-7 fw-bold">{{car.name}}</div>
        <div class="col-5">Prix: {{car.price}}</div>
      </div>
      <div class="row car-cards ">
        <div class="col-md-3 col-6 col-wrap">
          <div class=" main-pic">
            <img [src]="car.mainPicture" class="d-block" [alt]="car.mainPicture"/>
          </div>
        </div>

        <div class="col-md-3 col-6 col-wrap">
          <div class="features">
            <div class="feature">
              <div class="badge">Année :</div>
              <span class="feature-value">{{car.year}}</span></div>
            <div class="feature">
              <div class="badge">KM :</div>
              <span class="feature-value">{{car.km}}</span></div>
            <div class="feature">
              <div class="badge"><i class="bi bi-ev-front"></i> :</div>
              <span class="feature-value">{{car.fuel}}</span></div>
          </div>
        </div>
        <div class="col-md-3 col-9 col-wrap">
          <div class="options" *ngIf="car.options.length > 0">
            <div class="row m-0 gap-1">
              <div *ngFor="let opt of car.options" class="car-opt badge bg-warning">{{ opt }}</div>
            </div>
          </div>
        </div>
        <div class="col-3 col-wrap actions">
          <div class="d-flex flex-column flex-md-row gap-2 actions px-lg-2">
            <div role="button" class="btn btn-warning d-block"><i class="bi bi-pencil-square"></i></div>
            <div role="button" class="btn btn-dark d-block"><i class="bi bi-trash3"></i></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {

        font-family: Barlow, sans-serif;
        background-color: white;
        gap: .5rem;
        border-radius: .375rem;
        outline: 1px solid #d92332;
      }

      .car {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: .6rem;
        align-items: center;

        & > * {
          width: 100%;
        }
      }

      .car-cards {
        align-content: stretch;
        & > .col-wrap > * {
          box-shadow: 2px 1px 8px 0 rgba(0, 0, 0, 0.1);
          outline: 1px solid rgba(217, 35, 50, 0.2);
          outline-offset: -.5px;
          border-radius: .375rem;
          padding: .4rem;
          height: 100%;
          max-height: 140px;
        }
        & > .col-wrap {
          padding: .2rem;
          margin: 0;
        }
      }

      .car-header {
        border-radius: .375rem;
        outline: 1px solid rgba(217, 35, 50, 0.2);
        outline-offset: -.5px;
        padding: .4rem;
      }

      .main-pic {
        overflow: hidden;
        border-radius: .4rem;
        display: flex;
        background-color: #a6a6a6;
        padding: 0!important;

        img {
          margin: auto;
          object-fit: cover;
          max-width: 100%;
          max-height: 100%;
          box-shadow: 0 0 16px 8px rgba(0, 0, 0, 0.5);
        }
      }

      .features {
        display: flex;
        flex-direction: column;
        gap: .15rem;
        border-radius: .375rem;
        background-color: #f7f7f7;
      }

      .feature {
        display: flex;
        justify-content: flex-start;
        gap: .4rem;
        align-items: center;

        .badge {
          background-color: #a6a6a6;
          letter-spacing: .1rem;
        }

        line-height: 1;

        &-value {
          display: block;
        }
      }

      .options {
        background-color: #f7f7f7;
        flex-wrap: wrap;
        gap: .2rem;

        .car-opt {
          font-size: .95rem;
          font-weight: bold;
          display: block;
          width: auto;
          color: white;
        }
      }

      .actions {
        .btn {
          height: fit-content;
        }
      }
    `
  ]
})
export class VehicleComponent {
  @Input() car!: vehicle
}
