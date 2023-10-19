import { Component, Input } from '@angular/core';
import { AbstractComponent } from "../../abstract.component";

@Component({
  selector: 'app-comment',
  template: `
    <div class="info">
      <div class="d-flex justify-content-end name-note gap-2">
        <span class="fw-bold w-100">{{comment.name}}</span>
        <span
          class="badge flex-shrink-0 online"
          [ngClass]="{
            'bg-danger': !comment.enabled,
            'bg-success': comment.enabled
          }"
        >{{ comment.enabled ? "on" : "off" }}</span>
        <span class="text-center badge bg-info note flex-shrink-0">{{comment.note}}/10</span>
      </div>
      <div>Message: <span>{{comment.message}}</span></div>
    </div>
    <div class="d-flex flex-column flex-lg-row gap-2 actions px-lg-2">
      <div role="button" class="btn btn-warning d-block" (click)="putAction(['edit','vehicle',comment.id])"><i class="bi bi-pencil-square"></i></div>
      <div role="button" class="btn btn-dark d-block" (click)="putAction(['delete','vehicle',comment.id])"><i class="bi bi-trash3"></i></div>
    </div>
  `,
  styles: [ `
    :host {
      display: flex;
      justify-content: space-between;
      font-family: Barlow, sans-serif;
      background-color: white;
      gap: .5rem;
      padding: .4rem .5rem;
      border-radius: .375rem;
      outline: 1px solid #d92332;
    }

    .actions {
      div {
        margin: auto;
        border-radius: 4rem;
      }
    }

    .info {
      width: 100%;

      .note {
        min-width: 3.5rem;
      }
    }

    .name-note {
      max-width: 320px;
      border-bottom: 1px solid rgba(217, 35, 50, 0.2);
      border-radius: .375rem;
      padding: .1rem;
      padding-left: .3rem;
      * {
        display: block;
      }

      .online {
        min-width: 3rem;
      }
    }

  ` ]
})
export class CommentComponent extends AbstractComponent {
  @Input() comment!: {
    id: number,
    name: string,
    message: string,
    note: number,
    enabled: boolean
  }
}
