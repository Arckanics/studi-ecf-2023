import { Component } from '@angular/core';

@Component({
  selector: 'app-vehicules',
  template: `
    <p>
      vehicules works!

    </p>
    <app-double-range id="km"
        [min]="0" [max]="200000" [step]="1000"
    ></app-double-range>
  `,
  styles: [
  ]
})
export class VehiculesComponent {

}
