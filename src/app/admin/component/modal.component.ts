import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
      <div id="admin-modal" class="modal" data-bs-backdrop="false">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
  `,
  styles: [
    `
      #admin-modal {
        position: fixed;
        top: 4rem;
        right: 0;
        left: 0;
        bottom: 3rem;
        background-color: rgba(0, 0, 0, 0.2);
      }
    `
  ]
})
export class ModalComponent {
  @Input() data!: any
}
