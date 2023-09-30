import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button class="{{btnCls}} {{xsHidden}}">
      <ng-content></ng-content>
    </button>
    <button class="{{btnCls}} {{xsVisible}}">
      <i class="{{iconCls}}"></i>
    </button>
  `,
  styles: [
  ]
})
export class ButtonComponent {
  xsHidden: string = "d-none d-md-block"
  xsVisible: string = "d-block d-md-none"

  @Input() btnCls!: string;
  @Input() iconCls!: string;
}
