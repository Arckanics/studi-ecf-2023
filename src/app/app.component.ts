import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: [ './app.styles.scss' ],
  encapsulation: ViewEncapsulation.None,

})
export class AppComponent {
}
