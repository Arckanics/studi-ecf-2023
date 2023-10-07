import { Component, OnInit } from '@angular/core';
import { HoursService } from "./service/hours.service";

@Component({
  selector: 'app-hours',
  template: `
    <p>
      hours works!
    </p>
  `,
  styles: [
  ]
})
export class HoursComponent implements OnInit {

  mainClasses!:string
  hours$!:any
  constructor(
    private hours: HoursService
  ) {
  }

  ngOnInit() {
    this.hours.getHours().subscribe({
      next: (data: any) => this.hours$ = data,
      error: (err: any) => console.log(err),
      complete: () => {}
      })
  }

}
