import { Component } from '@angular/core';
import { DatabaseService } from "../service/database.service";
import { Subscription } from "rxjs";
import { AbstractListComponent } from "../abstract-list.component";

@Component({
  selector: 'app-car-services',
  template: `
    <app-loading *ngIf="!list"></app-loading>
    <car-service *ngFor="let s of list" [service]="s" (action)="getAction($event)"></car-service>
    <div role="button" class="btn btn-secondary add-btn" (click)="getAction(['create','services'])">Ajouter</div>
    <app-modal [data]="dataPut"></app-modal>
  `,
  styles: [
    `
      :host {
        display: flex;
        position: relative;
        flex-direction: column;
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
export class CarServicesComponent extends AbstractListComponent {

  private db:string = "services"
  private sub: Subscription
  constructor(private bdd: DatabaseService) {
    super()
    this.sub = this.bdd.getData(this.db).subscribe((res: any) => {
      this.list = res
    })
  }
}
