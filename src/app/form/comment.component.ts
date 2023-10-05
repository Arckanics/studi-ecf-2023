import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  template: `
    <form class="{{formClass}}">
      <div class="mb-3">
        <label for="name" class="form-label">Nom</label>
        <input type="text" class="form-control" id="name" aria-describedby="nameHelp">
        <div id="nameHelp" class="form-text">Votre nom et/ou prénom</div>
      </div>
      <div class="mb-3">
        <div class="form-floating">
          <textarea class="form-control" placeholder="Leave a comment here" id="message" style="height: 124px"></textarea>
          <label for="message">Votre message</label>
        </div>
      </div>
      <app-note-input class="mb-1" [(value)]="note"></app-note-input>
    </form>
  `,
  styles: [
    `
    `
  ]
})
export class CommentComponent {
  @Input() formClass: string = ''
  note!: number

  ngOnInit() {
    this.note = 5
  }
}
