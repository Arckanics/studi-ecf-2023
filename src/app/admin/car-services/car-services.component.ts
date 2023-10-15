import { Component } from '@angular/core';
import { DatabaseService } from "../service/database.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-car-services',
  template: `
    <app-loading *ngIf="!services$"></app-loading>
    <car-service *ngFor="let s of services$" [service]="s"></car-service>
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
export class CarServicesComponent {

  private db:string = "services"
  private sub: Subscription
  public services$: any
  constructor(private bdd: DatabaseService) {
    this.sub = this.bdd.getData(this.db).subscribe((res) => {
      this.services$ = res
    })
  }
}
