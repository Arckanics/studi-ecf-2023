import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { setHeading } from "../../store/nav/heading.actions";
import { HomeFeatureService } from "../services/home-feature.service";
import { ClientNoteService } from "../services/client-note.service";

@Component({
  selector: 'app-home',
  template: `
    <div id="home" class="container-lg m-auto d-flex flex-column justify-content-start flex-md-row pt-2">
      <div id="services" class="flex-md-grow-1 flex-md-shrink-1 home-component" [ngClass]="{'enabled': topBottom}">
        <h3 class="h4 f-rajdhani component-title" (click)="collapse('top')">
          <span>Services</span><i class="bi bi-caret-left-fill d-md-none" [ngClass]="{'enabled': topBottom}"></i>
        </h3>
        <div class="list">
          <app-car-service *ngFor="let feat of features$" [feat]="feat"></app-car-service>
        </div>
      </div>
      <div id="comment" class="flex-md-grow-1 flex-md-shrink-1 home-component" [ngClass]="{'enabled': !topBottom}">
        <h3 class="h4 f-rajdhani component-title" (click)="collapse('bottom')">
          <span>Commentaires</span><i class="bi bi-caret-left-fill d-md-none" [ngClass]="{'enabled': !topBottom}"></i>
        </h3>
        <div class="list">
          <app-client-note *ngFor="let comment of comments$" [comment]="comment"></app-client-note>
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

        .component-title {
          padding: .5rem .9rem;
          margin: 0;
          display: flex;
          justify-content: space-between;
          flex-shrink: 0;
          user-select: none;
          -moz-user-select: none;
          -webkit-user-select: none;

          i {
            transition: transform 200ms ease;

            &.enabled {
              transform: rotate(-90deg);
            }
          }
        }


        .list {
          display: flex;
          flex-direction: column;
          gap: .8rem;
          padding: 0 .9rem;
          padding-bottom: 1rem;
          overflow-y: auto;
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
          }

          .list {
            transition: 500ms;
            opacity: 0;
            visibility: hidden;
            overflow-x: hidden;
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
    private store: Store<{ heading: string }>,
    private features: HomeFeatureService,
    private comments: ClientNoteService
  ) {
    this.store.dispatch(new setHeading('Accueil'))
  }

  ngOnInit(): void {
    this.features.getFeatures().subscribe({
      next: (data: any) => this.features$ = data,
      error: (err:any) => console.log(err),
      complete: () => {}
    })
    this.comments.getFrontComments().subscribe({
      next: (data: any) => this.comments$ = data,
      error: (err:any) => console.log(err),
      complete: () => {}
    })
  }

  collapse($el:string) {
    if ($el === "top") {
      this.topBottom = true
    } else {
      this.topBottom = false
    }
  }


}
