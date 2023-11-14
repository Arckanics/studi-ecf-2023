import { Component, ElementRef, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { SetModalItem, ToggleModal } from "../../store/modal/modal.actions";

@Component({
  selector: 'app-car-card',
  template: `
    <div class="card bg-white rounded-2 position-relative car-card pb-2 shadow">
      <div class="car-price bg-dark rounded-2 text-white px-2">{{car.price}}€</div>
      <div class="card-img-top ratio-16x9 car-pic rounded-top-2 overflow-hidden">
        <img [src]="'/img/'+car.mainPicture" [alt]="car.name">
      </div>
      <div class="card-body p-2 px-3">
        <h5 class="card-title mb-2 car-name">{{car.name}}</h5>
        <div class="card-text text-secondary">
          <p>Année : {{car.year}}</p>
          <p>Energie : {{car.fuel}}</p>
          <p>Kilomètres : {{car.km}}</p>
        </div>
        <hr class="mt-0">
        <div class="car-under-price mb-3">
          {{car.price}}€
        </div>
        <button class="btn btn-dark btn-sm m-auto d-block" (click)="enableDetails(true)">Détails</button>
      </div>
    </div>
    <div class="modal" [ngClass]="{
        'd-block position-absolute': toggleDetails
      }">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{car.name}}</h5>
            <button type="button" class="btn-close" aria-label="Close" (click)="enableDetails(false)"></button>
          </div>
          <div class="modal-body">
            <h4>Galerie</h4>
            <div class="img-slider p-0 mb-3">
              <div [id]="carouselId" class="carousel slide">
                <div class="carousel-indicators">
                  <button type="button"
                          [attr.data-bs-slide-to]="0"
                          [attr.data-bs-target]="'#'+carouselId"
                          class="active"
                  ></button>
                  <button
                    *ngFor="let img of car.gallery; let i = index"
                    type="button"
                    [attr.data-bs-slide-to]="i+1"
                    [attr.data-bs-target]="'#'+carouselId"
                  ></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img [src]="'/img/'+car.mainPicture" class="d-block" [alt]="car.mainPicture">
                  </div>
                  <div *ngFor="let img of car.gallery; let i = index"
                       class="carousel-item">
                    <img [src]="'/img/'+img" class="d-block" [alt]="img">
                  </div>
                </div>
                <button class="carousel-control-prev ctrl-btn" type="button" [attr.data-bs-target]="'#'+carouselId" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button class="carousel-control-next ctrl-btn" type="button" [attr.data-bs-target]="'#'+carouselId" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
              </div>
            </div>
            <h4>Options</h4>
            <div class="d-flex gap-2 justify-content-start flex-wrap mb-3">
              <div class="d-block" *ngFor="let opt of car.options">
                <div class="car-opt">
                  <div class="badge bg-secondary">{{opt}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary btn-sm" (click)="toggleContactForm()">Nous Contacter</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .car-card {
        font-family: Rajdhani, sans-serif;
        outline: 4px solid transparent;
        outline-offset: 4px;
        transition: outline-color 200ms ease;
        height: 100%;

        &:hover {
          outline-color: rgba(0, 0, 0, 0.4);
        }

        .car-name {
          font-size: 1.2rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .car-pic {
          display: block;
          min-height: 210px;
          max-height: 218px;
          max-width: 100%;

          img {
            display: block;
            max-height: 100%;
            object-fit: cover;
            margin: auto;
          }
        }
      }

      .car-under-price {
        font-weight: bold;
        font-family: Barlow, sans-serif;
      }

      .car-price {
        position: absolute;
        top: 8px;
        left: 8px;
        font-size: 1.5rem;
        min-width: 45%;
        text-align: center;
        font-family: Barlow, sans-serif;
      }

      .card-text {
        & > * {
          margin: 0;
          font-size: 1.1rem;
        }
      }

      .modal {
        background-color: rgba(0, 0, 0, 0.2);
        .img-slider {
          .carousel {
            border-radius: .4rem;
            overflow: hidden;
          }
        }
      }

      .carousel {
        background-color: rgba(0, 0, 0, 0.1);

        .ctrl-btn {
          background-color: rgba(0, 0, 0, 0.1);
        }

        .carousel-control-next {
          &-icon {
            filter: drop-shadow(1px 1px 2px black);
          }
        }

        .carousel-control-prev {
          &-icon {
            filter: drop-shadow(1px 1px 2px black);
          }
        }

        .carousel-indicators {
          button {
            border-radius: .5rem !important;
            filter: drop-shadow(1px 1px 2px black);
          }
        }

      }

      .carousel-item {
        aspect-ratio: 16/9;

        img {
          margin: auto;
          max-height: 100%;
        }
      }
    `
  ]
})
export class CarCardComponent {
  @Input() car!: any
  @Input('data-bs-slide-to') slideTo: any;
  toggleDetails:boolean = false
  carouselId!:string;

  constructor(private ref: ElementRef, private store: Store<{ modal: any }>) {
  }
  autoParse(data:any): any {
    return typeof data === "string" ? JSON.parse(data) : data
  }
  ngOnInit() {
    this.car.gallery = this.autoParse(this.car.gallery)
    this.car.options = this.autoParse(this.car.options)
  }
  enableDetails(status: boolean) {
    this.carouselId = "car-"+this.car.id
    this.toggleDetails = status;
  }

  toggleContactForm() {
    this.enableDetails(false);
    this.store.dispatch(new SetModalItem({ item: 'contact', static: false, extra: {contactSubject: this.car.name} }))
    this.store.dispatch(new ToggleModal(true))
  }
}
