import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header id="header" class="container-fluid bg-white border-primary flex-shrink-0 shadow-sm">
      <section class="container m-auto">
        <app-navigation></app-navigation>
      </section>
    </header>
  `,
  styles: [
    `
      #header {
        border-bottom: transparent solid 5px;
      }
    `
  ]
})
export class HeaderComponent {

}
