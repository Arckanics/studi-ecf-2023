import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { SetModalItem, ToggleModal } from "../../store/modal/modal.actions";

@Component({
  selector: 'app-footer',
  template: `
    <footer class="container-fluid shadow-lg border-dark border-top flex-shrink-0">
      <div class="container m-auto">
        <div class="container p-3 px-4 d-flex justify-content-between">
          <app-button btnCls="btn btn-outline-dark btn-sm" iconCls="bi bi-person-fill">
            Connexion
          </app-button>
          <app-button btnCls="btn btn-secondary btn-sm" iconCls="bi bi-calendar"
            (click)="hoursWindow()"
          >
            Horaires
          </app-button>
          <app-button btnCls="btn btn-primary btn-sm" iconCls="bi bi-envelope" (click)="contactForm()">
            Nous contacter
          </app-button>
        </div>
      </div>
    </footer>
  `,
  styles: [
  ]
})
export class FooterComponent {

  constructor(private store: Store<{modal:any}>) {
  }
  contactForm() {
    this.store.dispatch(new SetModalItem({ item: 'contact', static: false }))
    this.store.dispatch(new ToggleModal(true))
  }

  hoursWindow() {
    this.store.dispatch(new SetModalItem({ item: 'hours', static: true }))
    this.store.dispatch(new ToggleModal(true))
  }
}
