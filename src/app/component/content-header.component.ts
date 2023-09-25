import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-content-header',
  template: `
    <div class="container-fluid px-3">
      <h1 class="h3 f-rajdhani fw-bold mt-3 mb-0">{{heading$ | async}}</h1>
      <hr class="hr m-0 border border-dark opacity-75">
    </div>
  `,
  styles: [
  ]
})
export class ContentHeaderComponent {
  heading$: Observable<string>

  constructor( private store: Store<{ heading: string }>) {
    this.heading$ = store.select("heading")
  }
}
