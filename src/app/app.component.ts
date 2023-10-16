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

    .actions {
      .btn {
        width: fit-content;
        height: fit-content;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
      }
    }
  ` ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
