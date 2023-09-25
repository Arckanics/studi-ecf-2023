import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { setHeading } from "../../store/nav/heading.actions";

@Component({
  selector: 'app-home',
  template: `
    <p>
      home works!
    </p>
  `,
  styles: [
  ]
})
export class HomeComponent {
  constructor( private store: Store<{heading:string}>) {
    this.store.dispatch(new setHeading('Accueil'))
  }
}
