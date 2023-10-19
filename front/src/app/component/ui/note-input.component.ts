import { Component, EventEmitter, Input, Output, } from '@angular/core';

@Component({
  selector: 'app-note-input',
  template: `
    <label class="form-label" for="note">Note: ({{value}})</label>
    <div class="stars-wrapper rounded-2">
      <div class="notes-overlay" (mouseout)="mouseOut($event)">
        <div *ngFor="let n of forLoop(10); index as i" (click)="setChange(n)" (mouseenter)="mouseEnter($event,n)"
             class="click-square"></div>
      </div>
      <app-note-star [note]="tmpNote ? tmpNote : value" [max]="10" [fullWidth]="true"
                     tabindex="-1">
      </app-note-star>
    </div>

  `,
  styles: [
    `
      .stars-wrapper {
        position: relative;
      }
      .notes-overlay {
        position: absolute;
        overflow: hidden;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        .click-square {
          flex-grow: 1;
        }
      }
    `
  ]
})
export class NoteInputComponent {
  @Input() value: number = 5;
  @Output() valueChange = new EventEmitter<number>();
  tmpNote: number | undefined

  constructor() {
  }

  mouseEnter($event: any, n: number) {
    $event.preventDefault()
    this.tmpNote = n
  }

  mouseOut($event: any) {
    $event.preventDefault()
    this.tmpNote = undefined
  }

  forLoop(n: number = 1, start: number = 1) {
    return Array(n).fill(0).map((x, i) => i + start)
  }

  setChange($event: any) {
    this.valueChange.emit($event)
  }


}
