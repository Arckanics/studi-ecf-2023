import { Component } from '@angular/core';
import { DatabaseService } from "../service/database.service";
import { Subscription } from "rxjs";
import { AbstractListComponent } from "../abstract-list.component";

@Component({
  selector: 'app-comments',
  template: `
    <app-loading *ngIf="!list"></app-loading>
    <app-comment
        *ngFor="let c of list" [comment]="c"
        (action)="getAction($event)"
    ></app-comment>
    <div role="button" class="btn btn-secondary add-btn" (click)="getAction(['create','comments'])">Ajouter</div>
    <app-modal></app-modal>
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
export class CommentsComponent extends AbstractListComponent {
  private db: string = "commentaires"
  constructor(private bdd: DatabaseService) {
    super()
    this.sub = this.bdd.getData(this.db).subscribe((res: any) => {
      this.list = res
    })
  }
}
