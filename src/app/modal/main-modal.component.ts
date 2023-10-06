import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicFormDirective } from "./dynamic-form.directive";
import { modalState } from "../../store/modal/modal.reducer";
import { Store } from "@ngrx/store";
import { ToggleModal } from "../../store/modal/modal.actions";
@Component({
  selector: 'app-main-modal',
  template: `
    <div id="modal-window">
      <div class="modal d-block position-absolute" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header p-1">
              <h5 class="modal-title px-2">{{titles[component]}}</h5>
              <button type="button" class="btn-close m-1" aria-label="Close" (click)="closeModal()"></button>
            </div>
            <div class="modal-body p-2">
              <ng-template
                formComp [component]="component"
                formClass="rounded-2 p-1"
                (formUpdate)="updateForm($event)"
              >

              </ng-template>
            </div>
            <div class="modal-footer p-1">
              <button type="button" class="btn btn-outline-dark" (click)="closeModal()">Fermer</button>
              <button type="button" class="btn btn-primary">Envoyer</button>
            </div>
          </div>
        </div>
      </div>
    </div>`,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 50;
        background-color: rgba(0, 0, 0, 0.1);
        box-shadow: 0 0 1rem 8px #f2f2f2 inset;
      }

      #modal-window {
        margin: auto;
      }
    `
  ]
})
export class MainModalComponent implements OnInit {

  @ViewChild(DynamicFormDirective) formComp!: DynamicFormDirective
  public component: any = '';
  public titles: any = {
    comment: 'Témoignage',
    contact: 'Nous contacter'
  }
  public urls: any = {
    comment: 'commentaires',
    contact: 'contact'
  }
  private data: any
  private url:string = ""
  constructor(
    public dynamicComp: DynamicFormDirective,
    private store: Store<{modal:any}>
  ) {

  }

  ngOnInit() {
    this.store.select('modal').forEach((prop: modalState) => {
      this.component = prop.item
      this.url = this.urls[prop.item]
    })
  }

  closeModal() {
    this.store.dispatch(new ToggleModal(false))
  }

  updateForm($event: any) {
    this.data = {...$event.value}
  }
}
