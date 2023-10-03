import { AfterViewInit, Directive, Input, Type, ViewContainerRef } from '@angular/core';
import { FormComponents } from "./form-components";


@Directive({
  selector: '[formComp]',
})
export class DynamicFormDirective implements AfterViewInit {
  @Input() component!: string
  constructor(
    private ref: ViewContainerRef
  ) {}

  clear() {
    this.ref.clear()
  }

  enableComponent() {
    if (this.component) {
      const comp = new FormComponents().getComponent(this.component)
      this.ref.createComponent(comp)
    }
  }

  ngAfterViewInit(): void {
    this.clear();
    this.enableComponent()
  }

}
