import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  template: `
    <div>
      <div class="d-flex justify-content-between"><span class="fw-bold">{{comment.name}}</span><span class="px-3">{{comment.note}}/10</span></div>
      <div>Message: <span>{{comment.message}}</span></div>
    </div>
    <div class="d-flex flex-column gap-2">
      <div role="button" class="btn btn-warning d-block"><i class="bi bi-pencil-square"></i></div>
      <div role="button" class="btn btn-dark d-block"><i class="bi bi-trash3"></i></div>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      font-family: Barlow, sans-serif;
      background-color: white;
      padding: .4rem .5rem;
      border-radius: .375rem;
      outline: 1px solid #d92332;
    }
  `]
})
export class CommentComponent {
  @Input() comment!: {
    id: number,
    name: string,
    message: string,
    note: number,
    enabled: boolean
  }
}
