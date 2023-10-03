import { Directive, Input, OnInit, Type, ViewContainerRef } from '@angular/core';


@Directive({
  selector: '[formComp]',
})
export class DynamicFormDirective implements OnInit {
  @Input() component!: Type<any>
  constructor(
    private ref: ViewContainerRef
  ) {

  }

  clear() {
    this.ref.clear()
  }

  enableComponent() {
    if (this.component) {
      this.ref.createComponent(this.component)
    }
  }

  ngOnInit(): void {
    this.clear();
    this.enableComponent()
  }

}
