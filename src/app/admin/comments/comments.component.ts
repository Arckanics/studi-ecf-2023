import { Component } from '@angular/core';
import { DatabaseService } from "../service/database.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-comments',
  template: `
    <app-comment
        *ngFor="let c of comments" [comment]="c"
    ></app-comment>
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
export class CommentsComponent {
  private db: string = "commentaires"
  private comments$!: Subscription
  comments: any
  constructor(private bdd: DatabaseService) {
    this.comments$ = this.bdd.getData(this.db).subscribe((res) => {
      this.comments = res
    })
  }
}
