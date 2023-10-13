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
    <p>
      vehicle works!
    </p>
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
    `
  ]
})
export class VehicleComponent {
  @Input() vehicle!: vehicle
}
