import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { modalState } from "../../store/modal/modal.reducer";

@Component({
  selector: 'app-front',
  template: `
    <section id="root" class="d-flex flex-column">
      <app-header></app-header>
      <app-content-header></app-content-header>
      <section class="position-relative m-auto flex-grow-1 flex-shrink-1 overflow-hidden container-fluid px-1">
        <router-outlet></router-outlet>
        <app-main-modal *ngIf="modalOpen"></app-main-modal>
      </section>
      <app-footer></app-footer>
    </section>`,
})
export class FrontComponent {
  toggleModal$!: { item: any; open: boolean }
  modalOpen: boolean = false

  constructor(
    private store: Store<{ modal: any }>
  ) {
    this.store.select('modal').forEach((prop: modalState) => {
      this.toggleModal$ = { ...prop }
      this.modalOpen = this.toggleModal$.open
    })

  }
}
