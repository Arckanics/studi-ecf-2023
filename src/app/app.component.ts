import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [ `
    html, body {
      overflow: hidden;
    }

    #root {
      height: 100dvh;
      max-height: 100dvh;
      overflow: hidden;
    }

    .f-rajdhani {
      font-family: Rajdhani, sans-serif;
    }
  ` ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
