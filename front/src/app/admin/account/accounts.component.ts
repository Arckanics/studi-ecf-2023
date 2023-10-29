import { Component } from '@angular/core';
import { AbstractListComponent } from "../abstract-list.component";
import { DatabaseService } from "../service/database.service";
import { act } from "@ngrx/effects";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-accounts',
  template: `
    <div role="button" class="btn btn-secondary add-btn" (click)="getAction(createAction)">Créer un compte</div>
    <app-account *ngFor="let acc of list" [user]="acc" (action)="getAction($event)"></app-account>
    <app-modal [ngClass]="{
        'd-none': !modalToggle
    }"
               (xhrSend)="submitForm(null)"
               (close)="this.closeModal()"
               [title]="title"
               [errorMsg]="errorTxt"
    >
      <form [formGroup]="formSet" *ngIf="passwordEdit && user" (submit)="prevSubmit($event)">
        <div class="mb-3">
          <div class="form-control fw-bold">
            Compte : {{user.account}}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="password">Nouveau mot de passe</label>
          <div class="input-group">
            <input [type]="viewPassword ? 'text': 'password'" class="form-control" id="password" formControlName="password">
            <div class="btn btn-dark" (click)="setPawswordView()"><i class="bi" [ngClass]="{
                'bi-eye-slash': viewPassword, 'bi-eye': !viewPassword
            }"></i></div>

          </div>
        </div>
      </form>
      <form [formGroup]="formSet" *ngIf="accountEdit && user" (submit)="prevSubmit($event)">
        <div class="mb-3">
          <div class="form-control fw-bold">
            Compte : {{user.account}}
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="account">Nouvelle adresse mail</label>
          <div class="input-group">
            <input type="email" class="form-control" id="account" formControlName="account">
          </div>
        </div>
      </form>
      <form [formGroup]="formSet" *ngIf="createAccount">
        <div class="mb-3">
          <label class="form-label" for="account">Nouvelle adresse mail</label>
          <div class="input-group">
            <input type="email" class="form-control" id="account" formControlName="account">
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label" for="password">Nouveau mot de passe</label>
          <div class="input-group">
            <input [type]="viewPassword ? 'text': 'password'" class="form-control" id="password" formControlName="password">
            <div class="btn btn-dark" (click)="setPawswordView()"><i class="bi" [ngClass]="{
                'bi-eye-slash': viewPassword, 'bi-eye': !viewPassword
            }"></i></div>

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
    `
  ]
})
export class AccountsComponent extends AbstractListComponent {
  createAccount: boolean = false
  passwordEdit: boolean = false
  accountEdit: boolean = false
  viewPassword: boolean = false
  title: string = ""
  errorTxt = ""
  user = {
    id: "",
    account : ""
  }
  constructor(private bdd: DatabaseService) {
    super()
    this.db = "accounts"
    this.sub = this.bdd.getData(this.db).subscribe((res: any) => {

      this.list = res
    })
  }

  override getAction(act: any): any | boolean {
    console.log(act.action)
    if (act.action == "edit-password") {
      this.passwordEdit = true
      this.user = this.list.find(u => u.id = act.id)
      this.title = "Mot de Passe"
      if (!this.user) {
        return false
      }
      this.formSet = new FormGroup({
        id: new FormControl(this.user.id),
        password: new FormControl('')
      })
      this.modalToggle = true
      this.event = act.action
    }
    if (act.action == "edit-account") {
      this.accountEdit = true
      this.user = this.list.find(u => u.id = act.id)
      this.title = "Adresse mail"
      if (!this.user) {
        return false
      }
      this.formSet = new FormGroup({
        id: new FormControl(this.user.id),
        account: new FormControl('')
      })
      this.event = act.action
      this.modalToggle = true
    }
    if (act.action == "create") {
      this.formSet = new FormGroup({
        account: new FormControl(''),
        password: new FormControl('')
      })
      this.title = "Nouveau Compte"
      this.createAccount = true
      this.event = act.action
      this.modalToggle = true
    }
    if (act.action == "delete") {
      super.getAction(act);
      this.submitForm(null, this.bdd)
    }
  }


  override closeModal() {
    super.closeModal();
    this.title = ""
    this.passwordEdit = false
    this.accountEdit = false
    this.createAccount = false
    this.formSet = new FormGroup({})
  }

  setPawswordView() {
    this.viewPassword = !this.viewPassword
  }

  override submitForm($event: any, bdd: any = null) {
    if (this.event == 'edit-password') {
      this.bdd.put(this.db, this.formSet.value).subscribe(e => {
        this.closeModal()
      },
        err => {
        const {message, error} = err
          console.log({message, error})
        this.errorTxt = error
      })
    }
    if (this.event == 'edit-account') {
      this.bdd.put(this.db, this.formSet.value).subscribe(e => {
        this.closeModal()
      },
        err => {
        const {message, error} = err
          console.log({message, error})
        this.errorTxt = error
      })
    }

    if (this.event === "create" || this.event === "delete") {
      super.submitForm($event, this.bdd);
    }
  }
}
