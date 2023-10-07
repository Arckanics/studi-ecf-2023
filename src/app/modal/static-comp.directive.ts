import {
  Directive,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { StaticComponents } from "./static-components";

@Directive({
  selector: '[appStaticComp]'
})
export class StaticCompDirective implements OnInit {
  @Input() component!: string
  @Input() mainClasses!: string
  private comp: any
  constructor(
    private ref: ViewContainerRef
  ) {}
  clear() {
    this.ref.clear()
  }

  enableComponent() {
    if (this.component) {
      const comp = new StaticComponents().getComponent(this.component)
      this.comp = this.ref.createComponent(comp)
      if (this.mainClasses) {
        this.comp.instance.mainClasses = this.mainClasses
      }
    }
  }
  ngOnInit(): void {
    this.clear();
    this.enableComponent()
  }

}
