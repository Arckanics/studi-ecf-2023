import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-client-note',
  template: `
    <div class="h6 f-rajdhani fw-bold mb-0 d-flex gap-4 justify-content-between align-items-center">
      <span class="client-name">{{comment.name}} </span><app-note-star [note]="comment.note"></app-note-star>
    </div>
    <p class="f-rajdhani m-0 desc p-0">
        {{comment.message}}
    </p>
  `,
  styles: [
    `
      :host {
        box-sizing: border-box;
        border: 1px solid black;
        background-color: white;
        box-shadow: 1px 2px 2px 2px rgba(0, 0, 0, 0.1);
        border-radius: .375rem;
        padding: .7rem .8rem;
      }

      .client-name {
        flex-shrink: 1;
      }
    `
  ]
})
export class ClientNoteComponent {
  @Input() comment: any

  stars: number = 0
  half: boolean = false
  empty: number = 0

  constructor() {

  }

}
