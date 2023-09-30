import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-note-star',
  template: `
    <div class="star-container d-flex gap-4 px-3">
      <i class="bi bi-star-fill" *ngFor="let s of toLoop(stars)"></i>
      <i class="bi bi-star-half" *ngIf="half"></i>
      <i class="bi bi-star" *ngFor="let s of toLoop(empty)"></i>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        box-sizing: border-box;
        flex-shrink: 0;
        padding: 0;
      }

      .star-container {
        font-size: 1rem;
      }
    `
  ]
})
export class NoteStarComponent implements OnInit, OnChanges{
  @Input() note:number = 0
  @Input() max:number = 10

  public half:boolean = false
  public stars:number = 0
  public empty:number = 0
  private onCoe:number = this.max / 5
  private isEven(n:number) {
    return Math.round(n) % 2 === 0
  }

  toLoop(n:number) {
    return Array(n).fill(0)
  }
  setStars() {
    const isEven = this.isEven(this.note)
    const note = this.note
    const coe = this.onCoe

    this.half = !isEven
    this.stars = Math.floor(note/coe)
    this.empty = Math.floor(5-note/coe)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setStars()
  }

  ngOnInit(): void {
    this.setStars()
  }


}
