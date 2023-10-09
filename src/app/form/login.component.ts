import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-login',
  template: `
    <form (submit)="submitForm($event)" [formGroup]="loginForm" class="p-2">

        <div class="mb-4">
          <label class="form-label">Type de connexion</label>
          <div class="btn-group w-100" role="group">
            <div role="button" class="btn w-50" (click)="conectType(false)" [ngClass]="{
            'btn-dark': !loginForm.value.isAdmin,
            'btn-outline-dark': loginForm.value.isAdmin
          }">Employé</div>
            <div role="button" class="btn w-50" (click)="conectType(true)" [ngClass]="{
            'btn-dark': loginForm.value.isAdmin,
            'btn-outline-dark': !loginForm.value.isAdmin
          }">Administrateur</div>
          </div>
        </div>
        <div class="mb-4">
          <label class="form-label" for="email">Email</label>
          <input
            type="email" id="email" name="email"
            class="form-control"
            formControlName="email" placeholder="john@doe.fr">
        </div>
      <div class="mb-4">
        <label class="form-label" for="email">Mot de passe</label>
        <input
          type="password" id="password" name="password"
          class="form-control"
          formControlName="password" placeholder="Votre mot de passe...">
      </div>
    </form>
  `,
  styles: [
  ]
})
export class LoginComponent {
  @Input() formClass: string = ''
  @Output() formUpdate = new EventEmitter<FormGroup>()
  loginForm: any = new FormGroup({
    isAdmin: new FormControl(false),
    email: new FormControl(''),
    password: new FormControl('')
  })
  submitForm($event: any) {
    if ($event) {
      $event.preventDefault()
    }
    this.formUpdate.emit(this.loginForm)
  }

  ngOnInit() {
    this.loginForm.valueChanges.subscribe(() => {
      this.submitForm(null)
    })
  }

  ngOnDestroy() {
    this.loginForm.valueChanges.unsubscribe()
  }
  conectType(isAdmin: boolean) {
    this.loginForm.controls.isAdmin.setValue(isAdmin)
  }
}
