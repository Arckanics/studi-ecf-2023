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
    <div>
      <h3 class="fs-6 text-decoration-underline">{{car.name}}</h3>
      <div class="d-flex gap-2">
        <img [src]="car.mainPicture" class="img-fluid main-pic d-block" [alt]="car.mainPicture" />
        <div>
          <div>Année : {{car.year}}</div>
          <div>KM : {{car.km}}</div>
          <div>énergie : {{car.fuel}}</div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host{

        font-family: Barlow, sans-serif;
        background-color: white;
        gap: .5rem;
        padding: .4rem .5rem;
        border-radius: .375rem;
        outline: 1px solid #d92332;
      }

      .main-pic {
        height: 120px;
        overflow: hidden;
        border-radius: .4rem;
      }
    `
  ]
})
export class VehicleComponent {
  @Input() car!: vehicle
}
