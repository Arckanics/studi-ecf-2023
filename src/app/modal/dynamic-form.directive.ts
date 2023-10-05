import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormComponents } from "./form-components";


@Directive({
  selector: '[formComp]',
})
export class DynamicFormDirective implements OnInit {
  @Input() component!: string
  @Input() formClass!: string
  constructor(
    private ref: ViewContainerRef
  ) {}

  clear() {
    this.ref.clear()
  }

  enableComponent() {
    if (this.component) {
      const comp = new FormComponents().getComponent(this.component)
      const ref = this.ref.createComponent(comp)
      ref.setInput('formClass', this.formClass)
    }
  }
  ngOnInit(): void {
    this.clear();
    this.enableComponent()
  }

}
