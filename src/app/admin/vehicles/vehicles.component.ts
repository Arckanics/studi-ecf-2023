import { Component } from '@angular/core';
import { Subscription } from "rxjs";
import { DatabaseService } from "../service/database.service";
import { AbstractListComponent } from "../abstract-list.component";

@Component({
  selector: 'app-vehicles',
  template: `
    <app-loading *ngIf="!vehicles"></app-loading>
    <app-vehicle *ngFor="let v of vehicles" [car]="v" (action)="getAction($event)"></app-vehicle>
    <div role="button" class="btn btn-secondary add-btn">Ajouter</div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        position: relative;
        gap: .4rem;
        padding: .4rem;
        padding-bottom: 4rem;
      }

      .add-btn {
        position: fixed;
        right: .4rem;
        bottom: 4rem;
      }
    `
  ]
})
export class VehiclesComponent extends AbstractListComponent{
  private db: string = "cars"
  private vehicles$!: Subscription
  vehicles: any
  constructor(private bdd: DatabaseService) {
    super()
    this.vehicles$ = this.bdd.getData(this.db).subscribe((res) => {
      this.vehicles = res
    })
  }

}
