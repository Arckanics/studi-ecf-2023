import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-double-range',
  template: `
    <div id="{{ id }}" class="double-range">
      <div class="range-slider">
        <span class="range-selected" [style]="
            'left:' + rangeSlide.start + '%;'+
            'right:' + rangeSlide.end + '%'
        "></span>
      </div>
      <div class="range-inputs">
        <input type="range" class="form-range inner-range range-min" min="{{minMaxStep.min}}" max="{{minMaxStep.max}}"
               [step]="minMaxStep.step" id="{{ id }}-min"
               name="min" [formControl]="minVal" (input)="inputSet('min')" value="{{minMaxStep.min}}">
        <input type="range" class="form-range inner-range range-max" min="{{minMaxStep.min}}" max="{{minMaxStep.max}}"
               [step]="minMaxStep.step" id="{{ id }}-max"
               name="max" [formControl]="maxVal" (input)="inputSet('max')" value="{{minMaxStep.max}}">
      </div>
    </div>
  `,
  styles: [
    `
      .double-range {
        position: relative;
        height: 24px;
        padding: calc((24px - 8px) / 2) 0;
      }
      .range-slider {
        height: 8px;
        position: relative;
        width: calc(100% - 20px);
        margin: auto;
        background-color: white;
        border-radius: 10px;
        outline: 1px solid rgba(217, 35, 50, 0.2);
        outline-offset: -1px;

        .range-selected {
          height: 100%;
          left: 30%;
          right: 30%;
          position: absolute;
          border-radius: 8px;
          background-color: #d92332;
        }
      }
    `,
    `
      .range-inputs {
        position: relative;
        margin-top: -8px;

        .inner-range {
          display: inline;
          position: absolute;
          width: 100%;
          height: 8px;
          background: none;
          pointer-events: none;
          -webkit-appearance: none;
          -moz-appearance: none;

          &::-webkit-slider-container, &::-moz-range-track {
            background-color: transparent;
          }

          &::-webkit-slider-thumb, &::-moz-range-thumb {
            height: 15px;
            width: 15px;
            border-radius: 20px;
            border: 5px solid #d92332;
            background-color: white;
            pointer-events: auto;
            -webkit-appearance: none;
            -moz-appearance: none;
            cursor: pointer;
            outline: 2px solid rgba(0, 0, 0, 0.15);
            outline-offset: -1px;
          }

        }
      }

    `
  ]
})
export class DoubleRangeComponent implements OnInit, OnChanges {
  @Input() id!: string;
  @Input() values!: { min: number, max: number };
  @Output() valuesChange = new EventEmitter<any>();
  @Input() minMaxStep: { min: number, max: number, step: number } = {
    min: 0,
    max: 100,
    step: 1
  }
  minVal = new FormControl(0);
  maxVal = new FormControl(0);
  rangeSlide = {
    start: 0,
    end: 0
  }
  inputSet(item:string) {
    const { minVal, maxVal } = this
    const Limits = (one: any, thumb: string) => {
      const max = maxVal.getRawValue() || 0
      const min = minVal.getRawValue() || 0
      if (thumb == 'min') {
        max <= one.getRawValue() && one.setValue(max)
      }
      if (thumb == 'max') {
        min >= one.getRawValue() && one.setValue(min)
      }
    }
    if (item == 'min') {
      Limits(minVal, 'min')
    } else {
      Limits(maxVal, 'max')
    }
    this.emitChange()
    this.refreshSlider()
  }

  emitChange() {
    this.valuesChange.emit({
      min: this.minVal.getRawValue(),
      max: this.maxVal.getRawValue(),
    })
  }

  private refreshSlider() {
    const max = this.maxVal.getRawValue() || 0
    const min = this.minVal.getRawValue() || 0
    const staticMax = this.minMaxStep.max - this.minMaxStep.min
    const staticMin = this.minMaxStep.min
    this.rangeSlide.start = ((min - staticMin) / staticMax) * 100
    this.rangeSlide.end = (1 - ((max - staticMin) / staticMax)) * 100
  }

  private updateValues() {
    const { minVal, maxVal } = this
    const { min, max } = this.minMaxStep
    if (this.values) {
      minVal.setValue(this.values.min)
      maxVal.setValue(this.values.max)
    } else {
      minVal.setValue(min)
      maxVal.setValue(max)
    }
    this.refreshSlider()
  }

  ngOnInit() {
    this.updateValues()
  }

  ngOnChanges(changes:SimpleChanges) {
    this.updateValues()
  }
}
