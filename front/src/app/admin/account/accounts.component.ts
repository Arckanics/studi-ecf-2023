import { Component } from '@angular/core';
import { AbstractListComponent } from "../abstract-list.component";
import { DatabaseService } from "../service/database.service";

@Component({
  selector: 'app-accounts',
  template: `
    <div role="button" class="btn btn-secondary add-btn" (click)="getAction(createAction)">Créer un compte</div>
  `,
  styles: [
  ]
})
export class AccountsComponent extends AbstractListComponent {
  constructor(private bdd: DatabaseService) {
    super()
    this.db = "accounts"
    this.sub = this.bdd.getData(this.db).subscribe((res: any) => {

      this.list = res
    })
  }
}
