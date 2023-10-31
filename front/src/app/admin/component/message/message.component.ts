import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `
    <div class="row p-2" (click)="openMsg()">
      <div class="col-9 p-2">
        <div class="d-flex flex-column flex-md-row align-items-center px-2">
          <span class="fw-bold mail">{{msg.mail}}</span>
          <span class="d-none d-md-inline">&nbsp; : &nbsp;</span>
          <span class="text-secondary"> {{msg.subject}}</span>
        </div>
      </div>
      <div class="col-3">
        <div class="d-flex justify-content-end align-items-center gap-0 position-relative">
          <div role="button" class="btn btn-info msg-btn msg-open"><i class="bi bi-envelope-open"></i></div>
          <div role="button" class="btn btn-secondary msg-btn msg-closed"><i class="bi bi-envelope"></i></div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        font-family: Barlow, sans-serif;
        background-color: white;
        padding: 0;
        outline: 1px solid #d92332;
        outline-offset: -1px;
        cursor: pointer;
        overflow: hidden;

        .msg-btn {
          transition: 200ms ease;
        }

        .msg-open {
          transition-delay: 0ms;
          visibility: hidden;
          opacity: 0;
          transform: translateX(100%) translateY(-110%);
        }

        .msg-closed {
          transition-delay: 200ms;
          visibility: visible;
          opacity: 1;
          transform: translateY(0%);
        }


        &:hover {
          background-color: rgba(0, 0, 0, 0.1);

          .mail {
            text-decoration: underline;
            text-decoration-color: var(--bs-primary);
          }

          .msg-btn {
            &.msg-open {
              transition-delay: 200ms;
              visibility: visible;
              opacity: 1;
              transform: translateX(100%) translateY(0%);
            }

            &.msg-closed {
              transition-delay: 0ms;
              visibility: hidden;
              opacity: 0;
              transform: translateY(110%);
            }
          }
        }
      }
    `
  ]
})
export class MessageComponent {
  @Input() msg!: any
  @Input() index!: any
  @Output() openMessage = new EventEmitter()
  openMsg() {
    this.openMessage.emit(this.index)
  }
}
