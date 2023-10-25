import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-car-card',
  template: `
      <div class="card bg-white rounded-2 position-relative car-card pb-2 shadow">
        <div class="car-price bg-dark rounded-2 text-white px-2">{{car.price}}€</div>
        <div class="card-img-top ratio-16x9 car-pic rounded-top-2 overflow-hidden">
          <img [src]="'/img/'+car.mainPicture" [alt]="car.name">
        </div>
        <div class="card-body p-2 px-3">
          <h5 class="card-title mb-2 car-name">{{car.name}}</h5>
          <div class="card-text text-secondary">
            <p>Année : {{car.year}}</p>
            <p>Energie : {{car.fuel}}</p>
            <p>Kilomètres : {{car.km}}</p>
          </div>
          <hr class="mt-0">
          <div class="car-under-price mb-3">
            {{car.price}}€
          </div>
          <button class="btn btn-dark btn-sm m-auto d-block">Détails</button>
        </div>
      </div>
  `,
  styles: [
    `
      .car-card {
        font-family: Rajdhani, sans-serif;
        outline: 4px solid transparent;
        outline-offset: 4px;
        transition: outline-color 200ms ease;
        height: 100%;

        &:hover {
          outline-color: rgba(0, 0, 0, 0.4);
        }

        .car-name {
          font-size: 1.2rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .car-pic {
          display: block;
          max-height: 218px;
          max-width: 100%;
          img {
            display: block;
            max-width: 100%;
            object-fit: cover;
            margin: auto;
          }
        }
      }

      .car-under-price {
        font-weight: bold;
        font-family: Barlow, sans-serif;
      }

      .car-price {
        position: absolute;
        top: 8px;
        left: 8px;
        font-size: 1.5rem;
        min-width: 45%;
        text-align: center;
        font-family: Barlow, sans-serif;
      }

      .card-text {
        & > * {
          margin: 0;
          font-size: 1.1rem;
        }
      }
    `
  ]
})
export class CarCardComponent {
  @Input() car!: any


}
