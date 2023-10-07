import {
  AfterViewInit,
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewContainerRef
} from '@angular/core';
import { FormComponents } from "./form-components";


@Directive({
  selector: '[formComp]',
})
export class DynamicFormDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() component!: string
  @Input() formClass!: string
  @Output() formUpdate = new EventEmitter<object>()
  private comp: any
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
      this.comp = ref
      ref.setInput('formClass', this.formClass)
    }
  }
  ngOnInit(): void {
    this.clear();
    this.enableComponent()

  }

  ngAfterViewInit() {
    const component = this.comp
    const form = component.instance.formUpdate
    form.subscribe((f:any) => this.formUpdate.emit(f))
  }
  ngOnDestroy(): void {
    this.comp.instance.formUpdate.unsubscribe()
  }

}
