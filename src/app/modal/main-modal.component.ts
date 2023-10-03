import { Component, ViewChild } from '@angular/core';
import { DynamicFormDirective } from "./dynamic-form.directive";
import { CommentComponent } from "../form/comment.component";
@Component({
  selector: 'app-main-modal',
  template: `
    <div id="modal-window">
      <ng-template formComp [component]="component"></ng-template>
    </div>`,
  styles: [
    `
      #modal-window {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 50;
        background-color: rgba(0, 0, 0, 0.25);
        box-shadow: 0 0 20px 8px #f2f2f2 inset;
      }
    `
  ]
})
export class MainModalComponent {

  @ViewChild(DynamicFormDirective) formComp!: DynamicFormDirective
  public component: any = CommentComponent;
  constructor(
    public dynamicComp: DynamicFormDirective
  ) {
  }

}
