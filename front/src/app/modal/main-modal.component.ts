import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicFormDirective } from "./dynamic-form.directive";
import { modalState } from "../../store/modal/modal.reducer";
import { Store } from "@ngrx/store";
import { ToggleModal } from "../../store/modal/modal.actions";
import { StaticCompDirective } from "./static-comp.directive";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-main-modal',
  template: `
    <div id="modal-window">
      <div class="modal d-block position-absolute" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content bg-white">
            <div class="modal-header p-1">
              <h5 class="modal-title px-2 fw-bold">
                {{titles[component]}}
                <span *ngIf="wrongThings" class="d-inline text-danger small">
                  (Erreur Client)
                </span>
              </h5>

              <button type="button" class="btn-close m-1" aria-label="Close" (click)="closeModal()"></button>
            </div>
            <div class="modal-body p-2">
              <ng-template *ngIf="!static"
                           formComp [component]="component"
                           formClass="rounded-2 p-1"
                           (formUpdate)="updateForm($event)"
              >
              </ng-template>
              <ng-template *ngIf="static"
                           appStaticComp [component]="component"
                           mainClasses="rounded-2 p-1"
              >

              </ng-template>
            </div>
            <div class="modal-footer p-1" >
              <button *ngIf="static" type="button" class="btn btn-outline-dark" (click)="closeModal()">Fermer</button>
              <button *ngIf="!static" type="button" class="btn btn-primary" (click)="requestParse()">{{submitName()}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>`,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 50;
        background-color: rgba(0, 0, 0, 0.1);
        box-shadow: 0 0 1rem 8px #f2f2f2 inset;
      }

      #modal-window {
        margin: auto;
      }
    `
  ]
})
export class MainModalComponent implements OnInit {

  @ViewChild(DynamicFormDirective) formComp!: DynamicFormDirective
  @ViewChild(StaticCompDirective) appStaticComp!: StaticCompDirective
  public component: any = '';
  public titles: any = {
    comment: 'Témoignage',
    contact: 'Nous contacter',
    hours: 'Horaires',
    login: 'Connexion'
  }
  public urls: any = {
    comment: 'commentaires',
    contact: 'contact',
    hours: 'horaires',
    login: 'users'
  }
  public static: boolean = false
  private data: any
  private url: string = ""
  wrongThings: any;

  constructor(
    public dynamicComp: DynamicFormDirective,
    private store: Store<{ modal: any }>,
    private http: HttpClient,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.store.select('modal').forEach((prop: modalState) => {
      this.component = prop.item
      this.static = prop.static
      this.url = this.urls[prop.item]
    })
  }

  closeModal() {
    this.store.dispatch(new ToggleModal(false))
  }

  updateForm($event: any) {
    this.wrongThings = false
    this.data = { ...$event.value }
  }

  submitName() {
    switch (this.component) {
      case 'login':
        return 'Connecter'
      default:
        return 'Envoyer'
    }
  }

  requestParse(): boolean {
    // front dev login requests
    // not for production
    const { urls, component, data, http } = this
    const host = window.location.host
    const proto = window.location.protocol
    const headers = {"XML-Http-Request": "true"}


    const assert = (v: any): boolean => {
      switch (true) {
        case typeof v === "boolean":
          return true
        case typeof v.length && v.length > 0:
          return true
        case typeof v === "number":
          return true
        default:
          return false
      }
    }
    if (component == 'login') {
      if (!data) {
        return false
      }
      if (data.mail.length == 0 || data.password.length == 0) {
        return false
      }
    }
    const formatData = (data: any): Array<string | undefined> =>
      Object.entries(data).map(([ k, v ]) =>
        assert(v) ? `${k}_like=${v}` : undefined)
        .filter(x => x !== undefined)


    const req = {
      url: `${proto}//${host}/${urls[component]}`,
      body: `?${formatData(data).join('&')}`
    }
    console.log(headers, null);
    http.get(req.url + req.body, { headers }).subscribe((res: any) => {
      const response = res[0]
      switch (true) {
        case component == 'login':
        case res.length > 0:
          const ls = window.localStorage
          const isAdmin = response.isAdmin === true ? "admin" : "user"

          ls.removeItem('user_token')
          ls.removeItem('user_type')
          ls.setItem('user_token', 'xxx')
          ls.setItem('user_type', isAdmin)
          this.router.navigateByUrl("/admin").then(n => {
            console.log(n)
          })
          break
        case res.length == 0:
          this.wrongThings = true
      }
    })
    return true
  }
}
