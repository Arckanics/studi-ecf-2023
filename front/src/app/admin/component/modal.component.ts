import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    <div id="admin-modal" class="modal p-0" data-bs-backdrop="false">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{title}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                    (click)="close.emit('close')"></button>
          </div>
          <div class="modal-body">
            <ng-content></ng-content>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" (click)="close.emit('close')">
              Annuler
            </button>
            <button type="button" class="btn btn-primary" (click)="send()">Appliquer</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      #admin-modal {
        position: fixed;
        top: 3.9rem;
        right: 0;
        left: 0;
        max-height: calc(100dvh - 7.4rem);
        background-color: rgba(0, 0, 0, 0.2);
      }
    `
  ]
})
export class ModalComponent {
  @Input() title!: string
  @Input() data!: any
  @Output() xhrSend = new EventEmitter()
  @Output() close = new EventEmitter()

  send() {
    this.xhrSend.emit('send')
  }

}
