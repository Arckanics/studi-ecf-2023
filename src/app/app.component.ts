import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from "@ngrx/store";
import { modalState } from "../store/modal/modal.reducer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  toggleModal$!: { item: any; open: boolean }
  modalOpen: boolean = false

  constructor(
    private store: Store<{modal: any}>
  ) {
    this.store.select('modal').forEach((prop: modalState) => {
      this.toggleModal$ = { ...prop }
      this.modalOpen = this.toggleModal$.open
    })

  }
}
