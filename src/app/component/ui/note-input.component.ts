import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Observable, } from "rxjs";

@Component({
  selector: 'app-note-input',
  template: `
    <label class="form-label" for="note">Note</label>
    <app-note-star [note]="value" [max]="10" [fullWidth]="true" class="p-0"
                   tabindex="-1" (click)="setLocal($event)">
    </app-note-star>

  `,
  styles: []
})
export class NoteInputComponent {
  @Input() value: number = 5;
  @Output() valueChange = new EventEmitter<number>();

  constructor(private el: ElementRef) {
  }
  setLocal($event: any) {
    const rect = this.el.nativeElement.getBoundingClientRect()
    const mouseX: number = $event.clientX - rect.left
    const res = Math.round(mouseX / rect.width * 10)
    this.valueChange.emit(res)
  }


}
