import { Component } from '@angular/core';
import { Subscription } from "rxjs";
import { DatabaseService } from "../service/database.service";

@Component({
  selector: 'app-hours-setup',
  template: `
    <app-loading *ngIf="!hours$"></app-loading>
    <admin-hours *ngFor="let h of hours$" [hour]="h"></admin-hours>
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
export class HoursSetupComponent {
  private db:string = "horaires"
  private sub: Subscription
  public hours$: any
  constructor(private bdd: DatabaseService) {
    this.sub = this.bdd.getData(this.db).subscribe((res) => {
      this.hours$ = res
    })
  }

}
