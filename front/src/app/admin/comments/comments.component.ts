import { Component } from '@angular/core';
import { DatabaseService } from "../service/database.service";
import { AbstractListComponent } from "../abstract-list.component";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-comments',
  template: `
    <app-loading *ngIf="!list"></app-loading>
    <app-comment
        *ngFor="let c of list" [comment]="c"
        (action)="getAction($event)"
    ></app-comment>
    <div role="button" class="btn btn-secondary add-btn" (click)="getAction(createAction)">Ajouter</div>
    <app-modal title="Témoignage">
      <form [formGroup]="formSet" class="admin-form">
        <div class="input-group mb-3">
            <label for="name" class="input-group-text input-label">Nom</label>
            <input type="text" class="form-control" id="name" formControlName="name">
        </div>
        <div class="input-group mb-3">
          <label for="message" class="input-group-text input-label">Message</label>
          <textarea type="text" class="form-control" id="message" formControlName="message"></textarea>
        </div>
        <div class="input-group mb-3">
          <label class="input-group-text input-label">Note</label>
          <select class="form-select" formControlName="note">
            <option *ngFor="let n of fillLoop(10)" [value]="n">{{n}}</option>
          </select>
        </div>
        <div class="mb-3">
          <div class="form-check form-switch form-check-reverse">
            <input type="checkbox" class="form-check-input" role="switch" id="enabled" formControlName="enabled">
            <label class="form-label">{{ formSet.controls['enabled'].value ? 'En ligne' : 'Hors Ligne' }}</label>
          </div>
        </div>
      </form>
    </app-modal>
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

      .form-check {
        filter: drop-shadow(1px 4px 3px rgba(0, 0, 0, 0.15));
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
    this.resetForm()
  }

  resetForm() {
    this.formSet = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(''),
      message: new FormControl(''),
      note: new FormControl(5),
      enabled: new FormControl(false)
    })
  }

  override getAction(act: any): any | boolean {
    if (act.action == 'create') {
      this.resetForm();
    }
    return super.getAction(act);
  }

}
