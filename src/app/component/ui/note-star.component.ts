import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-note-star',
  template: `
    <div class="star-container d-flex gap-2 gap-md-3" [ngClass]="{
     'bigger form-control py-3 px-0': fullWidth
    }">
      <i class="bi bi-star-fill m-auto" *ngFor="let s of toLoop(stars)"></i>
      <i class="bi bi-star-half m-auto" *ngIf="half"></i>
      <i class="bi bi-star m-auto" *ngFor="let s of toLoop(empty)"></i>
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
        &.bigger {
          font-size: 1.6rem;
          transition: color 200ms ease;
          justify-content: space-around;
          gap: 0 !important;
          i {
            &::before {
              margin: auto;
              display: block;
            }
          }
          &:hover {
            color: #d92332;
          }
        }
      }

      @media screen and (max-width: 768px) {
        .star-container {
          font-size: .7rem;
          &.bigger {
            font-size: 1.2rem;
          }
        }
      }
    `
  ]
})
export class NoteStarComponent implements OnInit, OnChanges {
  @Input() note!:number
  @Input() max:number = 10
  @Input() fullWidth:boolean = false

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
