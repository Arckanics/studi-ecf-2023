import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-car-service',
  template: `
    <div class="service-card p-3">
      <h5 class="h5 f-rajdhani fw-bold">{{feat.title | titlecase}}</h5>
      <p class="f-rajdhani m-0 desc">
        {{feat.text}}
      </p>
    </div>
  `,
  styles: [
    `
      .service-card {
        box-shadow: 1px 4px 4px 2px rgba(0, 0, 0, 0.2);
        background-color: white;
        border-radius: .375rem;
        border-left: .375rem solid black;
      }

      .desc {
        text-align: justify;
      }
    `
  ]
})
export class CarServiceComponent {
  @Input() feat!: any
}
