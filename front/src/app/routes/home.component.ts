import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { setHeading } from "../../store/nav/heading.actions";
import { HomeFeatureService } from "../services/home-feature.service";
import { ClientNoteService } from "../services/client-note.service";
import { SetModalItem, ToggleModal } from "../../store/modal/modal.actions";

@Component({
  selector: 'app-home',
  template: `
    <div id="home" class="container-lg m-auto d-flex flex-column justify-content-start flex-md-row pt-2 px-0">
      <div id="services" class="flex-md-grow-1 flex-md-shrink-1 home-component" [ngClass]="{'enabled': topBottom}">
        <h3 class="h4 f-rajdhani component-title" (click)="collapse('top')">
          <span>Services</span><i class="bi bi-caret-left-fill d-md-none" [ngClass]="{'enabled': topBottom}"></i>
        </h3>
        <div class="list">
          <app-loading *ngIf="!features$"></app-loading>
          <app-car-service *ngFor="let feat of features$" [feat]="feat"></app-car-service>
        </div>
      </div>
      <div id="comment" class="flex-md-grow-1 flex-md-shrink-1 home-component" [ngClass]="{'enabled': !topBottom}">
        <h3 class="h4 f-rajdhani component-title" (click)="collapse('bottom')">
          <span>Commentaires</span><i class="bi bi-caret-left-fill d-md-none" [ngClass]="{'enabled': !topBottom}"></i>
        </h3>
        <div class="list create">
          <app-loading *ngIf="!comments$"></app-loading>
          <app-client-note *ngFor="let comment of comments$" [comment]="comment"></app-client-note>
          <app-button (click)="openModal()"
                      btnCls="btn btn-secondary position-absolute bottom-0 end-0 m-1 mx-3 shadow"
                      iconCls="bi bi-plus">Ajouter
          </app-button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        height: 100%;
        display: block;
        overflow: hidden;

      }

      #home {
        height: 100%;
        max-height: 100%;
      }

      .home-component {
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        position: relative;

        .component-title {
          z-index: 20;
          padding: .5rem .9rem;
          margin: 0;
          display: flex;
          justify-content: space-between;
          box-shadow: 0 16px 8px -8px rgba(0, 0, 0, 0.2),
          0 16px 8px -12px #f2f2f2 inset;
          flex-shrink: 0;
          user-select: none;
          -moz-user-select: none;
          -webkit-user-select: none;
          background-image: linear-gradient(to right,
            transparent, white, white, transparent
          );

          i {
            transition: transform 200ms ease;

            &.enabled {
              transform: rotate(-90deg);
            }
          }
        }


        .list {
          z-index: 19;
          display: flex;
          flex-direction: column;
          gap: .8rem;
          padding: .6rem .7rem;
          overflow-y: auto;

          &.create {
            padding-bottom: 3.4rem;
          }
        }
      }

      @media screen and (max-width: 768px) {
        .home-component {
          transition: 650ms;
          flex-shrink: 1;
          min-height: 2.875rem;
          overflow-x: hidden;
          height: 0;

          .component-title {
            transition: 300ms ease;
            background-color: transparent;
            outline: 2px solid rgba(0, 0, 0, 0.2);
            outline-offset: -4px;
            border-radius: .4rem;
            background-image: none;
          }

          .list {
            transition: 500ms;
            opacity: 0;
            visibility: hidden;
            overflow-x: hidden;
            margin-right: .3rem;
          }

          &.enabled {
            height: 100%;

            .component-title {
              background-color: rgba(217, 35, 50, 0.05);
              outline-color: rgba(217, 35, 50, 0.2);
              color: #d92332;
            }

            .list {
              visibility: visible;
              opacity: 1;
            }
          }
        }
      }
    `
  ]
})
export class HomeComponent implements OnInit {

  features$: any = null
  comments$: any = null
  topBottom: boolean = true

  constructor(
    private store: Store<{ heading: string, modal: any }>,
    private features: HomeFeatureService,
    private comments: ClientNoteService
  ) {
    this.store.dispatch(new setHeading('Accueil'))
  }

  ngOnInit(): void {
    this.features.getFeatures().subscribe({
      next: (data: any) => this.features$ = data,
      error: (err: any) => console.log(err),
      complete: () => {
      }
    })
    this.comments.getFrontComments().subscribe({
      next: (data: any) => this.comments$ = data,
      error: (err: any) => console.log(err),
      complete: () => {
      }
    })
  }

  openModal() {
    this.store.dispatch(new SetModalItem({ item: 'comment', static: false }))
    this.store.dispatch(new ToggleModal(true))
  }

  collapse = ($el: string): any => {
    if (window.innerWidth > 768) {
      return false;
    }
    this.topBottom = $el === "top";

  };


}
