import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicFormDirective } from "./dynamic-form.directive";
import { modalState } from "../../store/modal/modal.reducer";
import { Store } from "@ngrx/store";
import { ToggleModal } from "../../store/modal/modal.actions";
import { StaticCompDirective } from "./static-comp.directive";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError } from "rxjs";

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
                  {{ errorMsg }}
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
  errorMsg: string = ""

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
    let headers: {[index:string]: string} = {"XML-Http-Request": "true"}


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
      if (data.account.length == 0 || data.password.length == 0) {
        return false
      }
      headers = {
        ...headers,
        'Content-Type': 'application/json'
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

    const result = (res: any) => {
      const {body} = res
      switch (true) {
        case component == 'login' && res.status == 404:
          this.errorMsg = "Compte Inexistant"
          this.wrongThings = true
          break
        case component == 'login' && res.status == 403:
          this.errorMsg = "Mauvais mot de passe"
          this.wrongThings = true
          break
        case component == 'login':
        case res.length > 0:
          const ls = window.localStorage
          const isAdmin = body.isAdmin === true ? "true" : "false"

          ls.removeItem('user_token')
          ls.removeItem('user_admin')
          ls.setItem('user_token', body.token)
          ls.setItem('user_admin', isAdmin)
          this.router.navigateByUrl("/admin").then(n => {
            console.log(n)
          })
          break

      }
      return res;
    }
    const request = http.post(req.url, data, { headers, observe: "response" })
      .pipe(catchError((err) => result(err)))
      .subscribe((res) => {
        request.unsubscribe()
        return result(res)
      })
    return true
  }
}
