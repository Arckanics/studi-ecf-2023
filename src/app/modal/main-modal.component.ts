import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicFormDirective } from "./dynamic-form.directive";
import { CommentComponent } from "../form/comment.component";
import { modalState } from "../../store/modal/modal.reducer";
import { Store } from "@ngrx/store";
@Component({
  selector: 'app-main-modal',
  template: `
    <div id="modal-window">
      <ng-template formComp [component]="component"></ng-template>
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
  public component: any = CommentComponent;
  constructor(
    public dynamicComp: DynamicFormDirective,
    private store: Store<{modal:any}>
  ) {

  }

  ngOnInit() {
    this.store.select('modal').forEach((prop: modalState) => {
      this.component = prop.item
    })
  }

}
