import { Component, Input } from '@angular/core';

export type Hour = {
  id: number
  day: number
  begin: string
  end: string
}

@Component({
  selector: 'admin-hours',
  template: `
    <div class="row align-items-center w-100">
      <div class="col-6 col-md-3"><span class="fw-bold">Jour: </span> <span class="text-capitalize">{{strDay}}</span>
      </div>
      <div class="col-6 col-md-3"><span class="fw-bold">Début: </span> <span>{{hour.begin}}</span></div>
      <div class="col-6 col-md-3"><span class="fw-bold">Fin: </span> <span>{{hour.end}}</span></div>
    </div>
    <div class="flex-shrink-0">
      <div class="d-flex align-items-end justify-content-end flex-md-row flex-column gap-2 actions">
        <div role="button" class="btn btn-warning d-block"><i class="bi bi-pencil-square"></i></div>
        <div role="button" class="btn btn-dark d-block"><i class="bi bi-trash3"></i></div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        font-family: Barlow, sans-serif;
        display: flex;
        background-color: white;
        gap: .5rem;
        padding: .4rem .5rem;
        border-radius: .375rem;
        outline: 1px solid #d92332;
      }
    `
  ]
})
export class HoursComponent {
  @Input() hour!: Hour
  strDay!: string

  constructor() {

  }

  ngOnInit() {
    const { day } = this.hour
    let date = new Date()
    let reset = date.getDay() + day - 6
    date.setDate(date.getDate() + reset)
    this.strDay = date.toLocaleDateString('fr-FR', { weekday: "long" })
  }
}
