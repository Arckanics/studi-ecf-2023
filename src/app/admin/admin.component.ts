import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  template: `
    <div id="app-container" class="container-fluid p-0">
      <header
        class="bg-white navbar border-bottom border-primary p-1 flex-shrink-0"
      >
        <ul class="nav justify-content-between w-100 p-1">
          <li class="nav-link p-0">
            <a class="btn nav-item"
               [ngClass]="{
                'btn-outline-primary': !rla.isActive,
                'btn-primary': rla.isActive
               }"
               routerLink="/admin" routerLinkActive #rla="routerLinkActive"
               [routerLinkActiveOptions]="{exact:true}">Accueil</a>
          </li>
          <li *ngFor="let item of list" class="nav-link p-0">
            <a class="btn nav-item"
               [ngClass]="{
                'btn-outline-primary': !rla.isActive,
                'btn-primary': rla.isActive
               }"
               [routerLink]="'/admin' + '/' + item.name" routerLinkActive #rla="routerLinkActive"
               [routerLinkActiveOptions]="{exact:true}">{{item.title}}</a>
          </li>
        </ul>
      </header>
      <section id="content" class="flex-shrink-1 z-2">
        <router-outlet></router-outlet>
      </section>
      <footer
        id="footer"
        class="bg-white p-2 flex-shrink-0 shadow-lg z-3 d-flex justify-content-between"
      >
        <span class="account-type d-block">Role: {{getRole()}}</span>
        <button class="btn btn-dark btn-sm d-block" (click)="logOut()">Déconnexion</button>
      </footer>
    </div>

  `,
  styles: [
    `
      :host {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        height: 100dvh;
        width: 100vw;
        font-family: Barlow, sans-serif;
      }

      #content {
        position: relative;
        flex-shrink: 1;
        overflow: auto;
        flex-grow: 1;
      }

      #app-container {
        overflow: hidden;
        height: 100%;
        max-height: 100dvh;
        flex-grow: 1;
        display: flex;
        flex-direction: column;

      }

      #footer {
        flex-shrink: 0;
        border-top: 1px solid rgba(217, 35, 50, 0.2);
      }

      .btn {
        font-weight: 500;
        font-family: Rajdhani, sans-serif;
      }

      .account-type {
        text-transform: capitalize;
      }
    `
  ]
})
export class AdminComponent {

  list: any
  private ls

  constructor(
    private router: Router
  ) {
    this.ls = window.localStorage
    const initList = () => {
      const type: any = {
        user: [
          { name: 'vehicles', title: "Véhicules" },
          { name: 'comments', title: "Témoignages" }
        ],
        admin: [
          { name: 'services', url: 'services', title: "Services" },
          { name: 'hours', url: 'hours', title: "Hours" }
        ],
      }
      const user = this.ls.getItem('user_type') || "user"
      return type[user];
    }
    this.list = initList()
  }

  getRole() {
    const role = this.ls.getItem('user_type')
    return role === "admin" ? "administrateur" : "employé"
  }

  logOut() {
    this.ls.removeItem('user_token')
    this.ls.removeItem('user_type')
    this.router.navigateByUrl("/")
  }
}
