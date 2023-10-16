import { Directive, EventEmitter, Output } from "@angular/core";

@Directive()
export class AbstractComponent {
  @Output() action = new EventEmitter()


  putAction(act: (string | number)[]) {
    this.action.emit({
      action: act[0],
      dataType: act[1],
      id: act[2] || undefined
    })
  }
}
