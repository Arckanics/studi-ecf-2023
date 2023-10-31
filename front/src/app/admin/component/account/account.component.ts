import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-account',
  template: `
    <div class="info">
      <div class="">
        <span class="fw-bold w-100">Compte : {{user.account}}</span>
      </div>
    </div>
    <div class="user-edit d-flex gap-1">
      <div role="button" class="btn btn-warning d-block" (click)="putAction(['edit-account','user',user.id])"><i class="bi bi-at"></i> </div>
      <div role="button" class="btn btn-warning d-block" (click)="putAction(['edit-password','user',user.id])"><i class="bi bi-key"></i></div>
      <div role="button" class="btn btn-dark d-block" (click)="putAction(['delete','user',user.id])"><i class="bi bi-trash3"></i></div>
    </div>
  `,
  styles: [
    `
      :host {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        padding: .8rem .8rem;
        border: solid 1px var(--bs-primary);
        border-radius: .4rem;
      }

      .user-edit {
        .btn {
          height: fit-content;
        }
      }
    `
  ]
})
export class AccountComponent {
  @Input() user: any
  @Input() index!: number
  @Output() action = new EventEmitter()
  putAction($event:any) {
    const act = {
      action: $event[0],
      id: $event[2],
      index: this.index
    }
    this.action.emit(act)
  }
}
