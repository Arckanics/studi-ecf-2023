import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div id="loading" class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `,
  styles: [
    `
      :host {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        padding: 0 !important;
        width: auto !important;
        z-index: 200;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 4rem;
      }

      #loading {
        position: relative;
        margin: auto;
        width: 4rem;
        height: 4rem;
        filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.3));
      }
    `

  ]
})
export class LoadingComponent {

}
