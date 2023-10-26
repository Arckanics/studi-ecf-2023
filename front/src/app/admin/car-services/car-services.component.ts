import { Component } from '@angular/core';
import { DatabaseService } from "../service/database.service";
import { AbstractListComponent } from "../abstract-list.component";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-car-services',
  template: `
    <app-loading *ngIf="!list"></app-loading>
    <car-service *ngFor="let s of list" [service]="s" (action)="getAction($event)"></car-service>
    <div role="button" class="btn btn-secondary add-btn" (click)="getAction(createAction)">Ajouter</div>
    <app-modal title="Service" *ngIf="modalToggle" (close)="closeModal()">
      <form class="admin-form" [formGroup]="formSet">
        <div class="mb-3">
          <div class="input-group">
            <label class="input-group-text">
              Titre
            </label>
            <input type="text" class="form-control" formControlName="title" />
          </div>
        </div>
        <div class="mb-3">
          <div class="input-group">
            <label class="input-group-text">
              Texte
            </label>
            <textarea class="form-control" formControlName="text" rows="5"></textarea>
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
      .add-btn {
        position: fixed;
        right: .4rem;
        bottom: 4rem;
      }
    `
  ]
})
export class CarServicesComponent extends AbstractListComponent {


  constructor(private bdd: DatabaseService) {
    super()
    this.db = "services"
    this.sub = this.bdd.getData(this.db).subscribe((res: any) => {

      this.list = res
    })
    this.resetForm()
  }

  resetForm() {
    this.formSet = new FormGroup({
      id: new FormControl(null),
      title: new FormControl(''),
      text: new FormControl(''),
    })
  }

  override getAction(act: any): any | boolean {
    if (act.action == 'create') {
      this.resetForm()
    }
    return super.getAction(act);
  }
}
