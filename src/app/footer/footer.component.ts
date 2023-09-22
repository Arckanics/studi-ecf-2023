import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="container-fluid shadow-lg border-dark border-top">
      <div class="container m-auto">
        <div class="container p-4 d-flex justify-content-between">
          <button class="btn btn-outline-dark">
            Connexion
          </button>
          <button class="btn btn-secondary">
            Informations
          </button>
          <button class="btn btn-primary">
            Nous contacter
          </button>
        </div>
      </div>
    </footer>
  `,
  styles: [
  ]
})
export class FooterComponent {

}
