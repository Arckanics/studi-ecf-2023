import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-double-range',
  template: `
    <div id="{{ id }}" class="double-range">
      <div class="range-slider">
        <span class="range-selected" [style]="
            'left:' + leftSet + '%;'+
            'right:' + rightSet + '%'
        "></span>
      </div>
      <div class="range-inputs">
        <input type="range" class="form-range inner-range range-min" min="{{min}}" max="{{max}}" [step]="step" id="{{ id }}-min"
               name="min" [formControl]="minVal" (input)="inputSet($event)" value="{{min}}">
        <input type="range" class="form-range inner-range range-max" min="{{min}}" max="{{max}}" [step]="step" id="{{ id }}-max"
               name="max" [formControl]="maxVal" (input)="inputSet($event)" value="{{max}}">
      </div>
    </div>
  `,
  styles: [
    `
      .range-slider {
        height: 10px;
        position: relative;
        width: calc(100% - 20px);
        margin: auto;
        background-color: white;
        border-radius: 10px;
        box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.2) inset;

        .range-selected {
          height: 100%;
          left: 30%;
          right: 30%;
          position: absolute;
          border-radius: 8px;
          background-color: #d9777F;
          box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.1) inset;
        }
      }
    `,
    `
      .range-inputs {
        position: relative;
        margin-top: -10px;

        .inner-range {
          display: inline;
          position: absolute;
          width: 100%;
          height: 10px;
          background: none;
          pointer-events: none;
          -webkit-appearance: none;
          -moz-appearance: none;

          &::-webkit-slider-container, &::-moz-range-track {
            background-color: transparent;
          }

          &::-webkit-slider-thumb {
            height: 18px;
            width: 18px;
            border-radius: 20px;
            border: 2px solid #d92332;
            background-color: white;
            pointer-events: auto;
            -webkit-appearance: none;
          }

          &::-moz-range-thumb {
            height: 18px;
            width: 18px;
            border-radius: 20px;
            border: 2px solid #d92332;
            background-color: white;
            pointer-events: auto;
            -moz-appearance: none;
          }
        }
      }

    `
  ]
})
export class DoubleRangeComponent implements OnInit {
  @Input() id!: string;
  @Input() min!: number;
  @Input() max!: number;
  @Input() step: number = 1;
  minVal = new FormControl(this.min);
  maxVal = new FormControl(this.max);
  leftSet: number = 0;
  rightSet: number = 0;

  @Output() minValue = this.minVal.getRawValue()
  @Output() maxValue = this.maxVal.getRawValue()

  inputSet($event: Event) {
    const item: any = $event.target
    const { minVal, maxVal } = this
    const Limits = (one: any, thumb:string , op: string = 'upper') => {
      const max = maxVal.getRawValue() || 0
      const min = minVal.getRawValue() || 0
      if (thumb == 'min') {
        max <= one.getRawValue() && one.setValue(max)
      }
      if (thumb == 'max') {
        min >= one.getRawValue() && one.setValue(min)
      }
      this.leftSet = (min / this.max) * 100
      this.rightSet = (1 - (max / this.max)) * 100
    }
    if (item.name == 'min') {
      Limits(minVal, 'min')
    } else {
      Limits(maxVal, 'max')
    }

  }

  ngOnInit() {
    const { min, max, minVal, maxVal } = this
    minVal.setValue(min)
    maxVal.setValue(max)
  }
}
