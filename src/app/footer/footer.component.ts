import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="container-fluid shadow-lg border-dark border-top flex-shrink-0">
      <div class="container m-auto">
        <div class="container p-3 px-4 d-flex justify-content-between">
          <app-button btnCls="btn btn-outline-dark btn-sm" iconCls="bi bi-person-fill">
            Connexion
          </app-button>
          <app-button btnCls="btn btn-secondary btn-sm" iconCls="bi bi-info-circle">
            Informations
          </app-button>
          <app-button btnCls="btn btn-primary btn-sm" iconCls="bi bi-envelope">
            Nous contacter
          </app-button>
        </div>
      </div>
    </footer>
  `,
  styles: [
  ]
})
export class FooterComponent {
}
