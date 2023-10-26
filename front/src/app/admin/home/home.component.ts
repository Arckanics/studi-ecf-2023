import { Component, OnDestroy } from '@angular/core';
import { interval, Subscription } from "rxjs";
import { DatabaseService } from "../service/database.service";

@Component({
  selector: 'app-home',
  template: `
    <section class="container">
      <div class="row g-2 align-items-center">
        <div class="col-9 p-2">
          <h1 class="h1">Bienvenue</h1>
        </div>
        <div class="col-3 p-2 py-4" id="clock-wrapper">
          <div id="clock">
            <div id="frame">
              <div id="hour"
                   [style]="{
                     'transform': hourRotation()
                     }"
              ></div>
              <div id="minute"
                   [style]="{
                     'transform': minuteRotation()
                     }"
              ></div>
              <div id="second"
                   [style]="{
                     'transform': secondRotation()
                     }"
              ></div>
              <div id="hide-circle">

              </div>
            </div>
          </div>
          <div id="digit">
            {{timeClock()}}
          </div>
        </div>
      </div>
      <section id="employee-home">
        <section class="card">
          <div class="card-header text-capitalize">état des données</div>
          <div class="card-body">
            <div id="services-count" class="fs-5">
              <span class="text-decoration-underline fw-bold">Services :</span>
              <span class="text-center"> {{counters.services}}</span>
            </div>
            <div id="services-count" class="fs-5">
              <span class="text-decoration-underline fw-bold">Véhicules :</span>
              <span class="text-center"> {{counters.cars}}</span>
            </div>
            <div id="services-count" class="fs-5">
              <span class="text-decoration-underline fw-bold">Horaires :</span>
              <span class="text-center"> {{counters.hours}}</span>
            </div>
            <div id="services-count" class="fs-5">
              <span class="text-decoration-underline fw-bold">Témoignages :</span>
              <span class="text-center"> {{counters.comments}}</span>
            </div>
          </div>
          <div class="card-footer">
            Soit un total de <span class="fw-bold">{{ entityLength }}</span> Entités
          </div>
        </section>
      </section>
    </section>
  `,
  styles: [
    `

      #clock {
        flex-grow: 1;
        aspect-ratio: 1/1;
        margin: auto;
        margin-bottom: .4rem;
        position: relative;
        height: 100%;
        max-height: 160px;
        filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.2));
      }

      #digit {
        text-align: center;
      }

      #hour {
        z-index: 2;
        position: absolute;
        width: 4px;
        height: 25%;
        top: 25%;
        left: calc(50% - 2px);
        background-color: black;
        transform-origin: bottom center;
        border-radius: 1rem;
      }

      #minute {
        z-index: 1;
        position: absolute;
        width: 3px;
        height: 40%;
        top: 10%;
        left: calc(50% - 1.5px);
        background-color: #808080;
        transform-origin: bottom center;
        border-radius: 1rem;
      }

      #second {
        z-index: 3;
        position: absolute;
        width: 2px;
        height: 45%;
        top: 5%;
        left: calc(50% - 1px);
        background-color: #d92332;
        transform-origin: bottom center;
        border-radius: 1rem;
      }

      #hide-circle {
        z-index: 4;
        position: absolute;
        width: 1rem;
        height: 1rem;
        top: calc(50% - .5rem);
        left: calc(50% - .5rem);
        background-color: #ffffff;
        box-shadow: 2px 4px 8px 0 rgba(0, 0, 0, 0.3);
        border-radius: 16rem;
      }

      #frame {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: 15rem;
        outline-offset: -2px;
        outline: 3px solid rgba(217, 35, 50, 0.5);
      }
    `
  ]
})
export class HomeComponent implements OnDestroy {

  private ls: Storage
  private currDate: Date = new Date()
  private clockObserve!: Subscription

  counters = {
    services: 0,
    cars: 0,
    hours: 0,
    comments: 0,
  }

  private bdds: string[] | Subscription[] = [
    'cars',
    'services',
    'hours',
    'comments'
  ]

  constructor(
    private bdd: DatabaseService
  ) {
    this.ls = window.localStorage
    this.clockObserve = interval(1000).subscribe(() => {
      this.currDate = new Date()
    })
    this.bdds.map((v: any, i) =>
      this.bdds[i] = this.bdd.fullRequest(v).subscribe((e) => {
        // @ts-ignore
        this.counters[`${v}`] = e.body.length
        if (this.bdds[i] instanceof Subscription) {
          // @ts-ignore
          this.bdds[i].unsubscribe()
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.clockObserve.unsubscribe()
  }

  timeClock() {
    return this.currDate.toLocaleTimeString('fr-FR', { hour: "2-digit", minute: "2-digit" })
  }

  hourRotation() {
    return 'rotate(' + ((360 / 12) * this.currDate.getHours()) + 'deg)'
  }

  minuteRotation() {
    return 'rotate(' + ((360 / 60) * this.currDate.getMinutes()) + 'deg)'
  }

  secondRotation() {
    return 'rotate(' + ((360 / 60) * this.currDate.getSeconds()) + 'deg)'
  }

  isAdmin() {
    return this.ls.getItem('user_type') == "admin"
  }

  get entityLength() {
    let total = 0
    Object.entries(this.counters).map(([ k, v ]) => {
      total += v
    })
    return total
  }
}
