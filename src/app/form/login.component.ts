import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-login',
  template: `
    <form (submit)="submitEvent($event)">

    </form>
  `,
  styles: [
  ]
})
export class LoginComponent {
  @Input() formClass: string = ''
  @Output() formUpdate = new EventEmitter<FormGroup>()
  submitEvent($event: SubmitEvent) {
    $event.preventDefault()
  }
}
