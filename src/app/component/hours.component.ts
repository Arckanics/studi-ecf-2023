import { Component, OnInit } from '@angular/core';
import { HoursService } from "./service/hours.service";

export type hourType = {
  id:number,
  day:number,
  begin:string,
  end:string,
}
@Component({
  selector: 'app-hours',
  template: `
    <div class="position-relative h-cont px-4">
      <app-loading *ngIf="!hours$"></app-loading>
        <div *ngFor="let hours of hours$; let i = index" class="day row g-2 justify-content-start">
          <ng-container *ngIf="hours">
            <div class="col-2 flex-shrink-1 fw-bold">{{ dayNames[i] | slice:0:3 }} : </div>
            <div *ngFor="let h of hours" class="col-5 text-center">
              {{ h.begin }} - {{ h.end }}
            </div>
          </ng-container>
        </div>
    </div>
  `,
  styles: [
    `
      .h-cont {
        min-height: 180px;
      }
    `
  ]
})
export class HoursComponent implements OnInit {

  mainClasses!:string
  hours$:any = null
  dayNames = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche'
  ]
  constructor(
    private hours: HoursService
  ) {
  }

  dataPrepare (data: hourType[]) {
    const sortHour = (a:string,b:string) => {
      if (a<b) {
        return -1
      }
      if (a>b) {
        return 1
      }
      return 0
    }
    const res = []
    for (let i=0; i<7;i++) {
      let filter = data.filter(h => h.day === i)
      if (filter.length > 0) {
        res.push(filter.sort((a,b) => {
          return sortHour(a.begin,b.begin)
        }))
      } else {
        res.push(null)
      }
    }
    this.hours$ = [...res]
  }

  ngOnInit() {
    this.hours.getHours().subscribe({
      next: (data: any) => this.dataPrepare(data),
      error: (err: any) => console.log(err),
      complete: () => {}
      })
  }

}
