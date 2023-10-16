import { Component } from '@angular/core';
import { Subscription } from "rxjs";
import { DatabaseService } from "../service/database.service";
import { AbstractListComponent } from "../abstract-list.component";

@Component({
  selector: 'app-hours-setup',
  template: `
    <app-loading *ngIf="!list"></app-loading>
    <admin-hours
      *ngFor="let h of list" [hour]="h"
      (action)="getAction($event)"
    ></admin-hours>
    <div role="button" class="btn btn-secondary add-btn" (click)="getAction(['create','horaires'])">Ajouter</div>
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
export class HoursSetupComponent extends AbstractListComponent{
  private db:string = "horaires"
  private sub: Subscription
  constructor(private bdd: DatabaseService) {
    super()
    this.sub = this.bdd.getData(this.db).subscribe((res: any) => {
      this.list = res
    })
  }

}
