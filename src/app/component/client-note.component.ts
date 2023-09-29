import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-note',
  template: `
    <div class="h6 f-rajdhani fw-bold mb-0">
      <span>{{comment.name}} : </span>
      <span>{{comment.note}}</span>
    </div>
    <p class="f-rajdhani m-0 desc p-0">
        {{comment.message}}
    </p>
  `,
  styles: [
    `
      :host {
        box-sizing: border-box;
        border: 1px solid black;
        background-color: white;
        box-shadow: 1px 2px 2px 2px rgba(0, 0, 0, 0.1);
        border-radius: .375rem;
        padding: .7rem .8rem;
      }
    `
  ]
})
export class ClientNoteComponent implements OnInit{
  @Input() comment: any

  stars: number = 0
  half:boolean = false
  empty:number = 0

  constructor() {

  }
  private isEven(n:number) {
    return n % 2 === 0
  }

  ngOnInit(): void {
    const note = this.comment.note
    const isEven = this.isEven(note)
    this.half = !isEven
    this.stars = isEven ? note / 2 : (note - 1) / 2
    this.empty = isEven ? 5 - note / 2 : 5 - (note + 1) / 2
  }
}
