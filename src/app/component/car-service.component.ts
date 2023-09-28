import { Component } from '@angular/core';

@Component({
  selector: 'app-car-service',
  template: `
    <div class="service-card p-3">
      <h5 class="h5 f-rajdhani fw-bold">Réparation Carrosserie</h5>
      <p class="f-rajdhani m-0 desc">
        Découvrez notre service de réparation de carrosserie expert.
        Confiez-nous votre véhicule et retrouvez son éclat d'origine en un clin d'oeil
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

}
