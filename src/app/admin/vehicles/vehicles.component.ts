import { Component } from '@angular/core';
import { Subscription } from "rxjs";
import { DatabaseService } from "../service/database.service";

@Component({
  selector: 'app-vehicles',
  template: `
    <app-loading *ngIf="!vehicles"></app-loading>
    <app-vehicle *ngFor="let v of vehicles"></app-vehicle>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        gap: .4rem;
        padding: .4rem;
      }
    `
  ]
})
export class VehiclesComponent {
  private db: string = "cars"
  private vehicles$!: Subscription
  vehicles: any
  constructor(private bdd: DatabaseService) {
    this.vehicles$ = this.bdd.getData(this.db).subscribe((res) => {
      this.vehicles = res
    })
  }
}
