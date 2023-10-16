import { Component, Input } from '@angular/core';
import { AbstractComponent } from "../../abstract.component";

export type CarService = {
  id: number,
  title: string,
  text: string
}
@Component({
  selector: 'car-service',
  template: `
    <div class="row g-1">
      <div class="col-10 px-1">
        <div class="d-flex flex-column gap-1">
          <div class="title fw-bold">
            {{service.title}}
          </div>
          <div>
            {{service.text}}
          </div>
        </div>
      </div>
      <div class="col-2 actions">
        <div class="d-flex flex-column flex-md-row justify-content-end align-items-end gap-2 actions">
          <div role="button" class="btn btn-warning d-block" (click)="putAction(['edit','services',service.id])" ><i class="bi bi-pencil-square"></i></div>
          <div role="button" class="btn btn-dark d-block" (click)="putAction(['delete','services',service.id])" ><i class="bi bi-trash3"></i></div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        padding: .4rem;
        border-radius: .375rem;
        outline: 1px solid #d92332;
        background-color: white;
      }
    `
  ]
})
export class CarServiceComponent extends AbstractComponent {
  @Input() service!:CarService
}
