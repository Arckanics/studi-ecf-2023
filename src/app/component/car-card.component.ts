import { Component } from '@angular/core';

@Component({
  selector: 'app-car-card',
  template: `
      <div class="card bg-white rounded-2 position-relative car-card pb-2 shadow">
        <div class="car-price bg-dark rounded-2 text-white px-2">5000€</div>
        <img src="https://placehold.co/600x400" class="card-img-top ratio-16x9 w-100 rounded-top-2" alt="...">
        <div class="card-body p-2 px-3">
          <h5 class="card-title mb-2">Laguna III</h5>
          <div class="card-text text-secondary">
            <p>Année : 2018</p>
            <p>Energie : Essence</p>
            <p>Kilomètres : 127289</p>
          </div>
          <hr class="mt-0">
          <div class="car-under-price">
            5000€
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
        &:hover {
          outline-color: rgba(0, 0, 0, 0.4);
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

}
