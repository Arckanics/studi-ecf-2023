import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-account',
  template: `
    <div class="info">
      <div class="p-2">
        <span class="fw-bold w-100">Compte : {{user.account}}</span>
      </div>
    </div>
    <div class="d-flex flex-column flex-lg-row gap-2 actions px-lg-2">
      <div role="button" class="btn btn-warning d-block" (click)="putAction(['edit-account','user',user.id])">email</div>
      <div role="button" class="btn btn-warning d-block" (click)="putAction(['edit-password','user',user.id])">mot de passe</div>
      <div role="button" class="btn btn-dark d-block" (click)="putAction(['delete','user',user.id])"><i class="bi bi-trash3"></i></div>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        background-color: white;
        padding: .4rem .2rem;
        border: solid 1px var(--bs-primary);
        border-radius: .4rem;
      }
    `
  ]
})
export class AccountComponent {
  @Input() user: any
  @Output() action = new EventEmitter()
  putAction($event:any) {
    const act = {
      action: $event[0],
      id: $event[2]
    }
    this.action.emit(act)
  }
}
